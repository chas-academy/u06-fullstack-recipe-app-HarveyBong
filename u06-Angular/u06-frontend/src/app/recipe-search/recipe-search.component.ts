import { Component, OnInit, input } from '@angular/core';

import { Router } from '@angular/router';
import { EdamamService } from '../services/edamam.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-search',
  standalone: true,
  imports: [FormsModule,CommonModule],
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

 userInput(input: string){
  let query;
  this.query=input;
  return input;
 }

  ngOnInit(): void {}

searchRecipes(){
  // Assuming you have already defined userInput method correctly in your class
  const query = this.userInput(this.query); // Capture the query input

  this.edamamService.getRecipe(query).subscribe((res) => {
    console.log(res);
    const recipeArray: any[] = res.hits.map((item: any) => {
      return {
        label: item.recipe.label,
        image: item.recipe.image,
        totalTime: item.recipe.totalTime,
        ingredientLines: item.recipe.ingredientLines,
        healthLabels: item.recipe.healthLabels,
        uri: item.recipe.uri,
       
        
      };
    });

    console.table(recipeArray);
    this.recipes = recipeArray;
  
  // this.edamamService.searchRecipes(this.query);
 });
}
}
