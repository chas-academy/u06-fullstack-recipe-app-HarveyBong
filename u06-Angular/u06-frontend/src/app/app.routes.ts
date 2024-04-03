import { Routes } from '@angular/router';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
export const routes: Routes = [

    { path: 'search', component: RecipeSearchComponent },
    { path: 'recipe/:id', component: RecipePageComponent },
    
    
    
    

];
