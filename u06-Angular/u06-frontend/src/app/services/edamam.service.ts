import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RecipeSearchComponent } from '../recipe-search/recipe-search.component';
@Injectable({
  providedIn: 'root'
})
export class EdamamService {
  //'https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=a48ffb7f&app_key=%205957a6ea474c03ca1437ec73df657ae5&health=peanut-free&health=pescatarian&health=pork-free&mealType=Dinner'

  private baseUrl = 'https://api.edamam.com/api/recipes/v2?type=public';
  private app_key = '5957a6ea474c03ca1437ec73df657ae5'
  private app_id = 'a48ffb7f'

  private httOptions = {
    headers: new HttpHeaders({
      accept: 'application/json',
      'Accept-Language': 'en',
    }),
  };

  constructor(private http: HttpClient) {}


  getRecipes(
    searchterm = '',
    cuisineType = '',
    mealType = '',
    dishType = ''
  ): Observable<any> {
    let url = this.baseUrl;
    if (searchterm) {
      url +=
        '&q=' +
        searchterm +
        '&app_id=' +
        this.app_id +
        '&app_key=' +
        this.app_key;
    } else {
      url += '&app_id=' + this.app_id + '&app_key=' + this.app_key;
    }

    if (cuisineType) {
      url += '&cuisineType=' + cuisineType;
    }
    if (mealType) {
      url += '&mealType=' + mealType;
    }
    if (dishType) {
      url += '&dishType=' + dishType;
    }
    console.log(url);

    return this.http.get<any>(url, this.httOptions);
  }

  getRecipe(id?: string): Observable<any> {
    // returnera den sträng som skapas med sitt id
    // Skapa en component som tar hand om en sak
    let url =
      'https://api.edamam.com/api/recipes/v2/' +
      id +
      '?type=public' +
      '&app_id=' +
      this.app_id +
      '&app_key=' +
      this.app_key;
    return this.http.get<any>(url, this.httOptions);
  }


}

