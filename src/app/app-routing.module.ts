import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AppRoutes } from './shared/routes.enum';

export const routes: Routes = [
  { path: AppRoutes.Login, component: LoginComponent },
  { path: AppRoutes.Recipes, component: RecipesComponent },
  { path: AppRoutes.Recipe + '/:id', component: RecipeComponent },
  { path: AppRoutes.Edit, component: RecipeEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
