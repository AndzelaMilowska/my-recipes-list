import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AppRoutes } from './shared/routes.enum';
import { AuthGuardService } from './auth/auth.guard.service';

export const routes: Routes = [
  { path: '', redirectTo: AppRoutes.Recipes, pathMatch: 'full' },
  { path: AppRoutes.Login, component: LoginComponent },
  {
    path: AppRoutes.Recipes,
    component: RecipesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: AppRoutes.Recipe + '/:id',
    component: RecipeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: AppRoutes.Edit,
    component: RecipeEditComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
