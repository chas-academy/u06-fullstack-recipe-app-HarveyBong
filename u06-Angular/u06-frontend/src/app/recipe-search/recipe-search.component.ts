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

searchRecipes(){
  this.edamamService.getRecipe('chicken').subscribe((res) =>{
    console.log(res);
    let recipeArray: any[];
    recipeArray = res.hits;
    console.log(recipeArray);

    let recipes = recipeArray.map(item => {
        return {
          //self: item._links.self.href,
          label: item.recipe.label,
          image: item.recipe.image,
          totalTime: item.recipe.totalTime,
          ingredientLines: item.recipe.ingredientLines
        }
    });
    console.table(recipes);
    this.recipes = recipes;
  // this.edamamService.searchRecipes(this.query);
 });
}
}
