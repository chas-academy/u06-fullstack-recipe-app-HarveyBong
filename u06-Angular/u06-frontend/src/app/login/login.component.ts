import { Component } from '@angular/core';
import { Login } from '../interfaces/login';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginDetails: Login;

  user: User;

  loggedIn$: Observable<boolean>;

  constructor(private auth: AuthService){
    this.loginDetails = {
      email:"felixnagy@live.se",
      password:"12345678"
    }

    this.user = {
      id:-1,
      name:"",
      email:"",
      created_at:"",


    }

    this.loggedIn$ = this.auth.loggedIn$;
  }

  login(){
    this.auth.loginUser(this.loginDetails);
  }
  logout(){
    this.auth.logOut();
  }

  getUser(){
    this.auth.getUser2().subscribe(res => {
      console.log(res[0]);
      this.user = res[0];
      this.user.welcomeMessage = `Welcome ${this.user.name}`;
    })
  }
}