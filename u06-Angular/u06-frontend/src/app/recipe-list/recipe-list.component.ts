import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  recipes:any[]=[]


constructor(){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
}
