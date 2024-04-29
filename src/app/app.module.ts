import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RecipesComponent } from './recipes/recipes.component';
import { LoginComponent } from './http/login/login.component';
import { AppComponent } from './app.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipesComponent,
    LoginComponent,
    RecipeComponent,
  ],
  imports: [BrowserModule, RouterOutlet, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
