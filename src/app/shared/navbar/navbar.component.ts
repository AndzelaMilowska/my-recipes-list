import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutes } from '../routes.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  categoriesList: string[] = this.categoriesService.categories;
  categoriesVisibility: boolean = false;
  isLoggedIn: boolean = false;
  constructor(
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private router: Router,
  ) {}
  public userSubscription: Subscription;

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(
      (user) => {
        if (user.token) {
          this.isLoggedIn = true;
          console.log(this.isLoggedIn);
        }
        if (!user.token) {
          this.isLoggedIn = false;
          console.log('loggedOut');
        }
      },
      //if user token expiration date valid then change is logged into true
    );
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate([AppRoutes.Login]);
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
