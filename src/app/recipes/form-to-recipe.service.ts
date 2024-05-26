import { Injectable } from '@angular/core';
import { Recipe } from './recipe.interface';
import { RecipeForm } from './recipe-form-object.interface';
import { RecipesService } from './recipes.service';

@Injectable({ providedIn: 'root' })
export class FormToRecipeService {
  constructor(private recipesService: RecipesService) {}

  convertFormToRecipe(formValues: RecipeForm): Recipe {
    let recipeObj: Recipe = {
      title: formValues.title,
      description: formValues.desctiption,
      ingredientsList: formValues.ingredients,
      instructions: formValues.instructions,
      numberOfPortions: formValues.numberOfPortions,
      id: this.recipesService.findAvailableIndex(),
    };
    if (formValues.img) {
      recipeObj.imgs = [formValues.img];
    }
    if (formValues.categories && formValues.categories[0]) {
      recipeObj.categories = formValues.categories;
    }
    return recipeObj;
  }
}
