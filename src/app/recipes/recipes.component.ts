import { Component } from '@angular/core';
import { RecipesService } from './recipes.service';
import { Router } from '@angular/router';
import { Recipe } from './recipe.interface';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent {
  constructor(
    private recipes: RecipesService,
    private router: Router,
  ) {}

  allRecipesList: Recipe[] = this.recipes.recipes;

  onClick(recipeId: number) {
    this.router.navigate([`recipe/${recipeId}`]);
  }

  displayRecipeImg(img: string | File) {
    return typeof img === 'string' ? img : URL.createObjectURL(img);
  }
}
