import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RecipesModule } from './recipes/recipes.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    RecipesModule,
    NavbarModule,
    AuthModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
