import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Observable } from 'rxjs';
import { RecipebyidPipe } from './pipes/recipebyid.pipe';
import { AuthService } from './services/auth.service';
import { User } from './interfaces/user';
import { LoggedInUser } from './interfaces/logged-in-user';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, CommonModule, RouterLink, RouterLinkActive, CommonModule, FormsModule, RecipebyidPipe,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  refresh() {
    location.reload();
  }
  title = 'u06-frontend';


  loggedIn$: Observable<LoggedInUser>; 

  constructor(private auth: AuthService) {
    this.loggedIn$ = this.auth.loggedIn$;
  }

  ngOnInit(boolean: Boolean) {
    boolean = false;
    if (this.loggedIn$) {
      boolean = true;
      let userToken = sessionStorage.getItem('token');
      console.log(userToken);
    }
  }
}
