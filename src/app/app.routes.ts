import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { LoginComponent } from './http/login/login.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';

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
