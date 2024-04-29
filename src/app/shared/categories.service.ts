import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  categories: string[] = [
    'Dinners',
    'Lunch',
    'Soups',
    'Desserts',
    'Breakfasts',
  ];

  addCategoty(categoryName: string) {
    this.categories.push(categoryName);
  }
}
