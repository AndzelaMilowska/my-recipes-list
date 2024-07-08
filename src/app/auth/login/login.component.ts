import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLogged: boolean = false;
  isRegisterModeOn: boolean = false;
  error: string;
  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
  ) {}

  submitForm(formData: NgForm) {
    if (!formData) {
      return;
    }

    let email = formData.value.login;
    let password = formData.value.password;

    if (this.isRegisterModeOn) {
      this.signUp(email, password);
    }

    if (!this.isRegisterModeOn) {
      this.signIn(email, password);
    }

    this.isLogged = true;
    this.getRecipesData();
  }

  changeMode() {
    this.isRegisterModeOn = !this.isRegisterModeOn;
  }

  getRecipesData() {
    this.dataStorageService.fetchRecipesData().subscribe({
      next: (response) => {
        this.dataStorageService.updateRecipesList(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  signUp(userEmail: string, userPassword: string) {
    this.authService.signUp(userEmail, userPassword).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        this.error = err;
      },
    });
  }

  signIn(userEmail: string, userPassword: string) {
    this.authService.signIn(userEmail, userPassword).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err.error.errors[0]);
      },
    });
  }
}
