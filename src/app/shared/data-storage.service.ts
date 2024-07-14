import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authConstants } from '../auth/auth.constants';
import { AuthService } from '../auth/auth.service';
import { concatMap, Observable, of, take, tap } from 'rxjs';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.interface';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
      const filePath = `uploads/${imageFile.name}`;
      const fileRef = this.storage.ref(filePath);
      return this.storage
        .upload(filePath, imageFile)
        .snapshotChanges()
        .pipe(concatMap(fileRef.getDownloadURL));
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
          console.log(response);
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

//add remove recipe request --> add remove recipe button xD --> redirect to all recipes

//file upload
