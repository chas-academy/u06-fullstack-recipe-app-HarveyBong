import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RecipeSearchComponent } from '../recipe-search/recipe-search.component';
@Injectable({
  providedIn: 'root'
})
export class EdamamService {

  private baseUrl = 'https://main--u06-recipe-harveybong.netlify.app/api.edamam.com/api/recipes/v2/';

  //'https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=a48ffb7f&app_key=%205957a6ea474c03ca1437ec73df657ae5&health=peanut-free&health=pescatarian&health=pork-free&mealType=Dinner'

  private app_key = '5957a6ea474c03ca1437ec73df657ae5'
  private app_id = 'a48ffb7f'

  private httpOptions= {

    headers: new HttpHeaders({
      'accept' : 'application/json',
      'Accept-Language': 'en'
    })
  }
 
  constructor(private http:HttpClient) { }

  searchRecipes(
    q: string,
    cuisineType?: string,
    mealType?: string
  ): Observable<any> {
    cuisineType = '';
    mealType = '';
    let url =
      this.baseUrl +
      '&q=' +
      q +
      '&app_id=' +
      this.app_id +
      '&app_key=' +
      this.app_key;
    return this.http.get<any>(url, this.httpOptions);
  }
  
  getRecipe(searchterm: string): Observable<any> {
    
    let cuisineType = 'American'
    let mealType = 'Breakfast'
    let url = this.baseUrl + '&q='+searchterm+ '&app_id='+this.app_id+'&app_key='+this.app_key+'&cuisineType='+cuisineType +'&mealType='+mealType; 
    return this.http.get<any>(url, this.httpOptions);
  }


  getRecipeById(id?: string): Observable<any> {
    let url =
      'https://main--u06-recipe-harveybong.netlify.app/api.edamam.com/api/recipes/v2/' +
      id +
      '?type=public' +
      '&app_id=' +
      this.app_id +
      '&app_key=' +
      this.app_key;
    return this.http.get<any>(url, this.httpOptions);
  }
}
