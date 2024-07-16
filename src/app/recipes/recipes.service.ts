import { Injectable } from '@angular/core';
import { Recipe } from './recipe.interface';
import { emptyRecipe } from './empty-recipe.constants';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private recipesList: Recipe[] = [];
  get currentRecipesList() {
    return this.recipesList;
  }

  set updateRecipesList(newRecipesList: Recipe[]) {
    this.recipesList = newRecipesList;
  }

  clearRecipesList() {
    this.recipesList = [];
  }

  addRecipe(recipeObject: Recipe, recipeArray: Recipe[]) {
    recipeArray.push(recipeObject);
  }

  updateRecipe(updatedRecipe: Recipe, recipeArray: Recipe[]) {
    let recipeIndex = recipeArray.findIndex(
      (recipe) => recipe.id === updatedRecipe.id,
    );

    if (recipeIndex === -1) {
      return;
    }
    recipeArray[recipeIndex] = updatedRecipe;
  }

  recipeById(index: number, recipeArray: Recipe[]): Recipe {
    let foundRecipe = recipeArray.find(({ id }) => id === index);
    if (foundRecipe != undefined) {
      return foundRecipe;
    } else {
      return emptyRecipe;
    }
  }

  findAvailableIndex(recipeArray: Recipe[]) {
    if (recipeArray.length === 0) {
      return 1;
    }
    const highestId = Math.max(...recipeArray.map((object) => object.id));
    return highestId + 1;
  }
}
