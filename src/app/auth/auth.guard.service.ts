import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppRoutes } from '../shared/routes.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuardService {
  static authGuardFn: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.user.pipe(
      map((user) => {
        const isAuth = !!user.id;
        if (isAuth) {
          return true;
        }
        return router.createUrlTree([AppRoutes.Login]);
      }),
    );
  };
}
