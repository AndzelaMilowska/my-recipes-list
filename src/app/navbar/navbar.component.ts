import { Component } from '@angular/core';
import { CategoriesService } from '../shared/categories.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  categoriesList: string[] = this.categoriesService.categories;
  constructor(private categoriesService: CategoriesService) {}
  categoriesVisibility: boolean = true;

}
