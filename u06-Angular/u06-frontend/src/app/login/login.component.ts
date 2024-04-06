import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { AsyncPipe } from '@angular/common';

import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Logindetails } from '../interfaces/logindetails';
import { LoggedInUser } from '../interfaces/logged-in-user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AsyncPipe,FormsModule,HttpClientModule, ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loggedIn$: Observable<LoggedInUser>; // Listens to changes in auth login. Connected to the loggedIn service

  constructor(private auth: AuthService, private router: Router) {
    this.loggedIn$ = this.auth.loggedIn$;
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    console.log('login-method');
    const loginData = this.loginForm.value;
    console.log(loginData);
    this.auth.loginUser(loginData as Logindetails);
    console.log('You are now logged in!');
  }

  /*   reRoute(route: string) {
    if (this.loggedIn$) {
      this.router.navigate([route]);
    }
  } */

  logOut() {
    this.auth.logoutUser();
  }
}
