import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipebyid',
  standalone: true
})
export class RecipebyidPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {

   /* return value
      .replace('https://api.edamam.com/api/recipes/v2/', '')
      .split('?')[0];
      */

    return value.replace("https://main--u06-recipe-harveybong.netlify.app/recipe/", "").split("?")[0];

  }
}
