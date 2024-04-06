import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { RecipebyidPipe } from '../pipes/recipebyid.pipe';
import { EdamamService } from '../services/edamam.service';
import { Recipe } from '../interfaces/recipe';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [RouterLink, CommonModule, RecipebyidPipe],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.css',
})
export class RecipePageComponent implements OnInit {
  recipe?: Recipe;
  id?: string;

  constructor(
    private route: ActivatedRoute,
    private edamameService: EdamamService
  ) {}

  // Takes the 'id' from the clicked recipe
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = String(params.get('id'));
      console.log(this.id);
      if (this.id) {
        this.getSingleRecipe();
      }
    });
  }

  getSingleRecipe() {
    this.edamameService.getRecipe(this.id).subscribe((result) => {
      console.table(result);

      let recipe: Recipe = {
        label: result.recipe.label,
        image: result.recipe.image,
        ingredientLines: result.recipe.ingredientLines,
        totalTime: result.recipe.totalTime,
        self: result._links.self.href,
        yield: result.recipe.yield,
        dietLabels: result.recipe.dietLabels,
        cautions: result.recipe.cautions,
        cuisineType: result.recipe.cuisineType,
        mealType: result.recipe.mealType,
        health: result.recipe.health,
        dishType: result.recipe.dishType,
        instructions: result.recipe.instructions,
        tags: result.recipe.tags,
      };
      console.table(recipe);
      this.recipe = recipe;
    });
  }
}
