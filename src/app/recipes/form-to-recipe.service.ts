import { Injectable } from '@angular/core';
import { Recipe } from './recipe.interface';
import { RecipeForm } from './recipe-form-object.interface';
import { RecipesService } from './recipes.service';

@Injectable({ providedIn: 'root' })
export class FormToRecipeService {
  constructor(private recipesService: RecipesService) {}

  convertFormToRecipe(formValues: RecipeForm): Recipe {
    const {
      title,
      img,
      desctiption,
      ingredients,
      instructions,
      categories,
      numberOfPortions,
      id,
    } = formValues;
    return {
      title: title,
      description: desctiption,
      ingredientsList: ingredients,
      instructions: instructions,
      numberOfPortions: numberOfPortions,
      id: id ? id : this.recipesService.findAvailableIndex(),
      imgs: img ? [img] : [],
      categories: categories?.length ? categories : [],
    };
  }
}
