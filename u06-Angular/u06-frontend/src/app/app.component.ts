import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RecipeResponse } from './interfaces/recipe';
import { Observable } from 'rxjs';
import { RecipebyidPipe } from './pipes/recipebyid.pipe';
import { AuthService } from './services/auth.service';
import { User } from './interfaces/user';
import { Login } from './interfaces/login';
import { LoggedInUser } from './interfaces/logged-in-user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, CommonModule, RouterLink, RouterLinkActive, CommonModule, FormsModule, RecipebyidPipe,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'u06-frontend';
  recipes: RecipeResponse[] = [];
 

  user?: User;

 // loginDetails: Login;

 // loggedIn$: Observable<LoggedInUser>;

 /* constructor(private auth: AuthService) {
    this.loginDetails = {
      email: 'felix@felix.se',
      password: '12345678',
    };

    this.loggedIn$ = this.auth.loggedIn$;
  }
  */



  ngOnInit(): void {

  }
}
