import { NgModule } from '@angular/core';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipesComponent } from './recipes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RecipesComponent, RecipeComponent, RecipeEditComponent],
  imports: [CommonModule, RouterOutlet, AppRoutingModule, ReactiveFormsModule],
  exports: [RecipesComponent, RecipeComponent, RecipeEditComponent],
})
export class RecipesModule {}
