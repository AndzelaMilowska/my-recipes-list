import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppRoutes } from '../shared/routes.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    return this.authService.user.pipe(
      map((user) => {
        const isAuth = !!user.id;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree([AppRoutes.Login]);
      }),
    );
  }
}
