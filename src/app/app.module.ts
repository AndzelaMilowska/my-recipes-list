import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RecipesComponent } from './recipes/recipes.component';
import { LoginComponent } from './http/login/login.component';
import { AppComponent } from './app.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipesComponent,
    LoginComponent,
    RecipeComponent,
    RecipeEditComponent,
  ],
  imports: [BrowserModule, RouterOutlet, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
