import { Component } from '@angular/core';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  categoriesList: string[] = this.categoriesService.categories;
  constructor(private categoriesService: CategoriesService) {}
  categoriesVisibility: boolean = true;

}
