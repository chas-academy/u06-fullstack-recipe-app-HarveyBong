import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { EdamamService } from '../services/edamam.service';

@Component({
  selector: 'app-recipe-search',
  standalone: true,
  imports: [],
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.css'
})


export class RecipeSearchComponent implements OnInit{

  query: string = ''; //the user input
  cuisineType: string = ''; // What country specific dish example 'American'
  mealType: string = ''; // breakfast, lunch, dinner etc
  health: string = ''; //allergy
  recipes: any[] = [];


  constructor(
    private edamamService:EdamamService,
    private router:Router
  ){}

 

  ngOnInit(): void {}

  searchRecipes() {
    // Call the service method with search parameters
    this.edamamService.searchRecipes(this.query, this.cuisineType, this.mealType, this.health)
      .subscribe((res: any) => {
        console.log(res);
        let recipeArray: any[] = res.hits.map((hit: any) => hit.recipe);
        console.log(recipeArray);
        this.recipes = recipeArray.map((recipe: any) => ({
          label: recipe.label,
          image: recipe.image,
          totalTime: recipe.totalTime,
          ingredientLines: recipe.ingredientLines
        }));
        console.table(this.recipes);
      });
  }
}
