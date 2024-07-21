import { Injectable } from '@angular/core';
import { Recipe } from './recipe.interface';
import { RecipeForm } from './recipe-form-object.interface';

@Injectable({ providedIn: 'root' })
export class FormToRecipeService {
  constructor() {}

  convertFormToRecipe(formValues: RecipeForm, index: number): Recipe {
    const {
      title,
      img,
      description,
      ingredients,
      instructions,
      categories,
      numberOfPortions,
      id,
    } = formValues;
    return {
      title,
      description,
      ingredientsList: ingredients,
      instructions,
      numberOfPortions,
      id: index,
      imgs: img ? [img] : [],
      categories: categories?.length ? categories : [],
    };
  }
}
