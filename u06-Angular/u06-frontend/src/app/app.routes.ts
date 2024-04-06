import { Routes } from '@angular/router';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './profile/register/register.component';

export const routes: Routes = [

    { path: '', component: RecipeSearchComponent },
    { path: 'recipe/:id', component: RecipePageComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    
    

];
