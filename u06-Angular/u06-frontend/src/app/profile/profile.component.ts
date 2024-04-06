import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RecipePageComponent } from '../recipe-page/recipe-page.component';
import { LoggedInUser } from '../interfaces/logged-in-user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ RouterOutlet,
    AsyncPipe,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LoginComponent,
    NgOptimizedImage,
    RecipePageComponent,],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  loggedIn$: Observable<LoggedInUser>; // Listens to changes in auth login. Connected to the loggedIn service

  constructor(private auth: AuthService, private router: Router) {
    this.loggedIn$ = this.auth.loggedIn$;

    
  }

  logOut() {
    this.auth.logoutUser();
  }

  

  /*   reRoute(route: string) {
    if (this.loggedIn$) {
      this.router.navigate([route]);
    }
  } */

  
}