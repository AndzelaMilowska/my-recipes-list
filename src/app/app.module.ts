import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';
import { RecipesModule } from './recipes/recipes.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    RecipesModule,
    NavbarModule,
    AuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
