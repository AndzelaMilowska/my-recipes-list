import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authConstants } from './auth.constants';
import { AuthResponse } from './auth-response.interface';
import { BehaviorSubject, catchError, ReplaySubject, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { User } from './user.model';
import { SignInErrors } from './login/error-messages.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(new User('', '', '', new Date(2005, 4, 2)));
  constructor(private http: HttpClient) {}
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponse>(authConstants.signUpEndpoint + authConstants.apiKey, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((err) => {
          let errorMessage = 'An error occurred';

          if (!err.error || !err.error.error) {
            return throwError(() => new Error(errorMessage));
          }
          switch (err.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage =
                'The email address is already in use by another account.';
          }

          return throwError(() => new Error(errorMessage));
        }),
        tap((response) =>
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn,
          ),
        ),
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponse>(authConstants.signInEndpoint + authConstants.apiKey, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((err) => {
          let errorMessage = 'An error occurred';

          if (!err.error || !err.error.error) {
            return throwError(() => new Error(errorMessage));
          }
          switch (err.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              errorMessage =
                'There is no user record corresponding to this identifier.';
              break;
            case 'INVALID_PASSWORD':
              errorMessage =
                'The password is invalid or the user does not have a password.';
              break;
          }

          return throwError(() => new Error(errorMessage));
        }),
        tap((response) =>
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn,
          ),
        ),
      );
  }

  logout() {
    const emptyUser = new User('', '', '', new Date(2005, 4, 2));
    this.user.next(emptyUser);
  }

  handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number,
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
  }
}
