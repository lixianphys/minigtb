import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchrecipesService } from '../services/fetchrecipes.service';

@Component({
  selector: 'app-r-details',
  imports: [],
  template: `
    <h3> Recipe Details </h3>
    @if (!recipeCategory.length) {
    <p>Loading...</p>
    }
    @else {
    <img [src]="recipeImgUrl" alt="Recipe Image">
    <p>
      ID: {{recipeId}}<br>
      Category: {{recipeCategory}}<br>
      Cuisine: {{recipeCuisine}}<br>
      Calories: {{recipeCalories}}<br>
      Protein: {{recipeProtein}}<br>
      Carbs: {{recipeCarbs}}<br>
      Fat: {{recipeFat}}<br>
      Sodium: {{recipeSodium}}<br>
      Is Vegetarian: {{recipeIsVegetarian}}<br>
      Is Vegan: {{recipeIsVegan}}<br>
      Is Gluten Free: {{recipeIsGlutenFree}}<br>
      Is Dairy Free: {{recipeIsDairyFree}}<br>
      Is Halal: {{recipeIsHalal}}<br>
      Is Kosher: {{recipeIsKosher}}<br>
      Is Sweet: {{recipeIsSweet}}<br>
      Is Bitter: {{recipeIsBitter}}<br>
      Is Metallic: {{recipeIsMetallic}}<br>
      Is Acidic: {{recipeIsAcidic}}<br>
      Is Soft: {{recipeIsSoft}}<br>
      Is Crunchy: {{recipeIsCrunchy}}<br>
      Is Chewy: {{recipeIsChewy}}<br>
      Is Liquid: {{recipeIsLiquid}}<br>
      Is Cold: {{recipeIsCold}}<br>
    </p>
    }
  `,
  styleUrl: './r-details.component.scss'
})
export class RDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  recipeService = inject(FetchrecipesService);
  recipeId=0;
  recipeImgUrl='';
  recipeCategory='';
  recipeCuisine='';
  recipeCalories=0;
  recipeProtein=0;
  recipeCarbs=0;
  recipeFat=0;
  recipeSodium=0;
  recipeIsVegetarian=false;
  recipeIsVegan=false;
  recipeIsGlutenFree=false;
  recipeIsDairyFree=false;
  recipeIsHalal=false;
  recipeIsKosher=false;
  recipeIsSweet=false;
  recipeIsBitter=false;
  recipeIsMetallic=false;
  recipeIsAcidic=false;
  recipeIsSoft=false;
  recipeIsCrunchy=false;
  recipeIsChewy=false;
  recipeIsLiquid=false;
  recipeIsCold=false;
  constructor() {
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
    });
    this.recipeService.getRecipeById(this.recipeId).subscribe(recipe => {
      this.recipeCategory = recipe.category;
      this.recipeCuisine = recipe.cuisine;
      this.recipeImgUrl = recipe.img_url;
      this.recipeCalories = recipe.calories;
      this.recipeProtein = recipe.protein;
      this.recipeCarbs = recipe.carbs;
      this.recipeFat = recipe.fat;
      this.recipeSodium = recipe.sodium;
      this.recipeIsVegetarian = recipe.is_vegetarian;
      this.recipeIsVegan = recipe.is_vegan;
      this.recipeIsGlutenFree = recipe.is_gluten_free;
      this.recipeIsDairyFree = recipe.is_dairy_free;
      this.recipeIsHalal = recipe.is_halal;
      this.recipeIsKosher = recipe.is_kosher;
      this.recipeIsSweet = recipe.is_sweet;
      this.recipeIsBitter = recipe.is_bitter;
      this.recipeIsMetallic = recipe.is_metallic;
      this.recipeIsAcidic = recipe.is_acidic;
      this.recipeIsSoft = recipe.is_soft;
      this.recipeIsCrunchy = recipe.is_crunchy;
      this.recipeIsChewy = recipe.is_chewy;
      this.recipeIsLiquid = recipe.is_liquid;
      this.recipeIsCold = recipe.is_cold;
    });
  }
}
