import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../shared/routes.enum';
import { concatMap } from 'rxjs';
import { AuthFormErrors } from './error-messages.enum';
import { recipeStarter } from '../../shared/start-recipe.mocks';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Input() login: string;
  isLogged: boolean = false;
  isRegisterModeOn: boolean = false;
  error: string;
  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private router: Router,
  ) {}

  submitForm(formData: NgForm) {
    let email = formData.value.login;
    let password = formData.value.password;

    if (formData.form.controls['login'].status === 'INVALID') {
      this.error = AuthFormErrors.INVALID_EMAIL;
      return;
    }

    if (password.length < 8) {
      this.error = AuthFormErrors.PASSWORD_IS_TO_SHORT;
      return;
    }

    if (formData.invalid) {
      return;
    }

    if (this.isRegisterModeOn) {
      this.signUp(email, password);
    }

    if (!this.isRegisterModeOn) {
      this.signIn(email, password);
    }

    this.isLogged = true;
  }

  changeMode() {
    this.isRegisterModeOn = !this.isRegisterModeOn;
  }

  signUp(userEmail: string, userPassword: string) {
    this.authService
      .signUp(userEmail, userPassword)
      .pipe(
        concatMap(() => {
          return this.dataStorageService.sendRecipesData(recipeStarter);
        }),
        concatMap(() => {
          return this.dataStorageService.fetchRecipesData();
        }),
      )
      .subscribe({
        next: (response) => {
          this.dataStorageService.updateRecipesList(response);
          this.router.navigate([AppRoutes.Recipes]);
        },
        error: (err) => {
          this.error = err;
        },
      });
  }

  signIn(userEmail: string, userPassword: string) {
    this.authService
      .signIn(userEmail, userPassword)
      .pipe(
        concatMap(() => {
          return this.dataStorageService.fetchRecipesData();
        }),
      )
      .subscribe({
        next: (response) => {
          this.dataStorageService.updateRecipesList(response);
          this.router.navigate([AppRoutes.Recipes]);
        },
        error: (err) => {
          this.error = err;
        },
      });
  }
}
