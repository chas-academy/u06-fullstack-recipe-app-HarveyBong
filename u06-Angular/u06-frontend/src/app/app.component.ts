import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RecipeResponse } from './interfaces/recipe';
import { Observable } from 'rxjs';
import { RecipebyidPipe } from './pipes/recipebyid.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, CommonModule, RouterLink, RouterLinkActive, CommonModule, FormsModule, RecipebyidPipe ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'u06-frontend';
  recipes: RecipeResponse[] = [];
 
  ngOnInit(): void {

  }
}
