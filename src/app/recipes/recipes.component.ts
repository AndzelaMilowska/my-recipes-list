import { Component } from '@angular/core';
import { RecipesService } from './recipes.service';
import { Router } from '@angular/router';
import { Recipe } from './recipe.interface';
import { AppRoutes } from '../shared/routes.enum';
import { recipeList } from './recipes-list.mocks';

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

  allRecipesList: Recipe[] = recipeList;

  onClick(recipeId: number) {
    this.router.navigate([AppRoutes.Recipe + '/' + recipeId]);
  }

  displayRecipeImg(img: string | File) {
    return typeof img === 'string' ? img : URL.createObjectURL(img);
  }
}
