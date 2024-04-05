import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { RecipebyidPipe } from '../pipes/recipebyid.pipe';
import { EdamamService } from '../services/edamam.service';
import { RecipeResponse } from '../interfaces/recipe';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [RouterLink,CommonModule, RecipebyidPipe],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.css'
})
export class RecipePageComponent implements OnInit{
id?:string;
recipe?:RecipeResponse;

constructor(private route: ActivatedRoute,
  private edamamService: EdamamService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') ?? '';
      console.log(this.id);
      if (this.id) {
        this.getRecipeById();
      }
    });
  }

  


    getRecipeById() {
      this.edamamService.getRecipeById(this.id).subscribe((res) => {
        console.table(res);
  
        let recipe: RecipeResponse = {
          label: res.recipe.label,
          image: res.recipe.image,
          ingredientLines: res.recipe.ingredientLines,
          totalTime: res.recipe.totalTime,
          yield: res.recipe.yield,
          dietLabels: res.recipe.dietLabels,
          cautions: res.recipe.cautions,
          cuisineType: res.recipe.cuisineType,
          mealType: res.recipe.mealType,
          dishType: res.recipe.dishType,
          instructions: res.recipe.instructions,
          tags: res.recipe.tags,
          self: res?.self,
          healthLabels: res.recipe.healthLabels,


        };
        console.table(recipe);
        this.recipe = recipe;
      });
    }
  }