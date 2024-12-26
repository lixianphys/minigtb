import { Component, input } from '@angular/core';
import { Recipe } from '../../model/recipe.type';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-recipe-item',
  imports: [NgIf,RouterLink],
  templateUrl: './recipe-items.component.html',
  styleUrl: './recipe-items.component.scss'
})
export class RecipeItemsComponent {
  recipe = input.required<Recipe>();  
}
