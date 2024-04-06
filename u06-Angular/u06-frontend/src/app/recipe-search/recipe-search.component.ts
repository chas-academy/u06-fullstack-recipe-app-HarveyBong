import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { EdamamService } from '../services/edamam.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RecipebyidPipe } from '../pipes/recipebyid.pipe';
import { Recipe } from '../interfaces/recipe';

@Component({
  selector: 'app-recipe-search',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RecipebyidPipe,
    RouterLink,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.css',
})
export class RecipeSearchComponent {
  recipes?: Recipe[];

  searchterm = '';

  health = [
    '',
    'egg-free',
    'alcohol-free',
    'dairy-free',
    'mustard-free',
    'peanut-free',
  ];
  cuisineTypes = [
    '',
    'American',
    'Asian',
    'British',
    'Caribbean',
    'Chinese',
    'French',
    'Indian',
    'Italian',
    'Japanese',
    'Kosher',
    'Mediterranean',
    'Nordic',
  ];
  mealTypes = ['', 'Breakfast', 'Dinner', 'Lunch', 'Snack', 'Teatime'];

  dishTypes = [
    '',
    'Bread',
    'Cereals',
    'Desserts',
    'Drinks',
    'Panncake',
    'Preps',
    'Preserve',
    'Salad',
    'Sandwiches',
    'Soup',
    'Starter',
    'Sweets',
  ];

  constructor(private edamameService: EdamamService) {}

  searchForm = new FormGroup({
    searchterm: new FormControl(''),
    mealType: new FormControl(''),
    cuisineType: new FormControl(''),
    dishType: new FormControl(''),
    health: new FormControl(''),
  });

  searchData: any;

  searchRecipe() {
    this.searchData = this.searchForm.value;
    let searchterm = this.searchData.searchterm;
    let cuisineType = this.searchData.cuisineType;
    let mealType = this.searchData.mealType;
    let dishType = this.searchData.dishType;
    let health = this.searchData.health;

    console.log(this.searchData);
    this.edamameService
      .getRecipes(searchterm, cuisineType, mealType, dishType, health)
      .subscribe((result) => {
        console.table(result);

        let recipes: Recipe[];
        recipes = result.hits.map(
          (item: {
            recipe: {
              label: any;
              image: any;
              ingredientLines: any;
              totalTime: any;
              yield: any;
              mealType?: any;
              health?: [];
            };
            _links: { self: { href: any } };
          }) => {
            return {
              label: item.recipe.label,
              image: item.recipe.image,
              ingredientLines: item.recipe.ingredientLines,
              totalTime: item.recipe.totalTime,
              yield: item.recipe.yield,
              mealType: item.recipe.mealType,
              self: item._links.self.href,
              health: item.recipe.health,
            };
          }
        );
        console.log(recipes);
        this.recipes = recipes;
      });
  }
}
