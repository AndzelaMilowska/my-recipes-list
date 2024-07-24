import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
