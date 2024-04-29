import {RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './http/login/login.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { RecipesComponent } from './recipes/recipes.component';

export const routes: Routes = [
    {path: 'login',
    component: LoginComponent
    },
    {path: 'recipes',
    component: RecipesComponent
    },
    {path: 'recipe',
    component: RecipeComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}