import { Component, OnInit, input } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { EdamamService } from '../services/edamam.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipebyidPipe } from '../pipes/recipebyid.pipe';
import { RecipeResponse } from '../interfaces/recipe';

@Component({
  selector: 'app-recipe-search',
  standalone: true,
  imports: [FormsModule,CommonModule,RecipebyidPipe,RouterLink],
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.css'
})


export class RecipeSearchComponent implements OnInit{

  query: string = ''; //the user input
  cuisineType: string = ''; // What country specific dish example 'American'
  mealType: string = ''; // breakfast, lunch, dinner etc
  health: string = ''; //allergy
  recipes: any[] = [];
  searchTerm: string = '';
  recipe: RecipeResponse[] = [];

  constructor(
    private edamamService:EdamamService,
    private router:Router
  ){}

 userInput(input: string){
  let query;
  this.query=input;
  return input;
 }

  ngOnInit(): void {}

  searchRecipes() {
    this.edamamService.searchRecipes(this.searchTerm).subscribe((res) => {
      console.table(res);

      let recipes: RecipeResponse[];
      recipes = res.hits.map(
        (item: {
          recipe: {
            label: any;
            image: any;
            ingredientLines: any;
            totalTime: any;
            yield: any;
            cautions:any;
            healthLabels:any;
          };
          _links: { self: { href: any } };
        }) => {
          return {
            label: item.recipe.label,
            image: item.recipe.image,
            ingredientLines: item.recipe.ingredientLines,
            totalTime: item.recipe.totalTime,
            yield: item.recipe.yield,
            self: item._links.self.href,
            cautions: item.recipe.cautions,
            healthLabels:item.recipe.healthLabels
          };
        }
      );
      console.log(recipes);
      this.recipes = recipes;
    });
  }
}