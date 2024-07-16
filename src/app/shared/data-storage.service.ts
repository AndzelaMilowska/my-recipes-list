import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authConstants } from '../auth/auth.constants';
import { AuthService } from '../auth/auth.service';
import { concatMap, Observable, of, take, tap } from 'rxjs';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.interface';
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/compat/storage';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private recipesService: RecipesService,
    private storage: AngularFireStorage,
  ) {}

  uploadRecipeImage(imageFile: string | File) {
    if (imageFile instanceof File) {
      let fileRef: AngularFireStorageReference;
      return this.authService.user.pipe(
        take(1),
        concatMap((user) => {
          if (!user.token) {
            fileRef = this.storage.ref(`${imageFile.name}`);
            return of(undefined);
          }

          const formData = new FormData();
          formData.append('thumbnail', imageFile);
          let image_path = `${user.id}/${imageFile.name}`.replace('/', '%2F');
          fileRef = this.storage.ref(`${user.id}/${imageFile.name}`);
          return this.http.post(
            `${authConstants.cloudStorage}${image_path}`,
            formData,
            {
              headers: new HttpHeaders().set(
                'Authorization',
                `Bearer ${user.token}`,
              ),
            },
          );
        }),
        concatMap(() => {
          return fileRef.getDownloadURL();
        }),
      );
    } else {
      return of(imageFile);
    }
  }

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

  deleteRecipeData(recipeID: Number) {
    return this.authService.user.pipe(
      take(1),
      concatMap((user) => {
        if (!user.token) {
          return of(undefined);
        }
        return this.http.delete(
          `${authConstants.projectURL}/${user.id}/recipes/${recipeID}.json`,
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

  uploadRecipeData(recipeData: Recipe) {
    let recipeFileObservable: Observable<any>;
    recipeFileObservable =
      recipeData.imgs && recipeData.imgs[0]
        ? this.uploadRecipeImage(recipeData.imgs[0])
        : of(undefined);

    return recipeFileObservable.pipe(
      take(1),
      tap((response) => {
        if (response && recipeData.imgs && recipeData.imgs[0]) {
          recipeData.imgs[0] = response;
        }
      }),
      concatMap(() => {
        return this.sendRecipesData(recipeData);
      }),
      concatMap(() => {
        return this.fetchRecipesData();
      }),
    );
  }
}

//--> only login page available if not logged in -> guard?

//add remove recipe request --> redirect to all recipes
