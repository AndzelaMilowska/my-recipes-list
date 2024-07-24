import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutes } from '../routes.enum';
import { RecipesService } from '../../recipes/recipes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  host: { '[class.menu_invisible]': 'menuVisibility' },
})
export class NavbarComponent implements OnInit, OnDestroy {
  categoriesList: string[] = this.categoriesService.categories;
  categoriesVisibility: boolean = false;
  isLoggedIn: boolean = false;
  menuVisibility: boolean = true;
  constructor(
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private router: Router,
    private recipesService: RecipesService,
  ) {}
  public userSubscription: Subscription;

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user.token) {
        this.isLoggedIn = true;
      }
      if (!user.token) {
        this.isLoggedIn = false;
      }
    });
  }
  toggleMenuVisibility(): void {
    this.menuVisibility = !this.menuVisibility;
  }
  onLogout() {
    this.authService.logout();
    this.recipesService.clearRecipesList();
    this.router.navigate([AppRoutes.Login]);
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
