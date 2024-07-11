import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authConstants } from '../auth/auth.constants';
import { AuthService } from '../auth/auth.service';
import { concatMap, take } from 'rxjs';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.interface';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private recipesService: RecipesService,
  ) {}

  sendRecipesData(recipe: Recipe) {
    const recipesData = JSON.stringify(recipe);
    return this.authService.user.pipe(
      take(1),
      concatMap((user) => {
        if (!user.token) {
          return this.http.get(
            `${authConstants.projectURL}/${user.id}/recipes.json`,
          );
        }
        return this.http.put(
          `${authConstants.projectURL}/${user.id}/recipes/${recipe.id}.json`,
          recipesData,
          {
            params: new HttpParams().set('auth', user.token),
          },
        );
      }),
    );
  }

  fetchRecipesData() {
    return this.authService.user.pipe(
      take(1),
      concatMap((user) => {
        if (!user.token) {
          return this.http.get(`${authConstants.projectURL}/recipes.json`);
        }
        return this.http.get(
          `${authConstants.projectURL}/${user.id}/recipes.json`,
          {
            params: new HttpParams().set('auth', user.token),
          },
        );
      }),
    );
  }

  updateRecipesList(databaseResponse: Object) {
    let newList: Recipe[] = [];
    if (!databaseResponse) {
      this.recipesService.updateRecipesList = [];
      return;
    }
    Object.values(databaseResponse).forEach((recipe) => {
      if (!(recipe as Recipe)) {
        return;
      }
      newList.push(recipe);
    });
    this.recipesService.updateRecipesList = newList;
  }
}

//--> only login page available if not logged in -> guard?

//add remove recipe request --> add remove recipe button xD --> redirect to all recipes

//file upload
