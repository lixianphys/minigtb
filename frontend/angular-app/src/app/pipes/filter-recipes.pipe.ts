import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../model/recipe.type';

@Pipe({
  name: 'filterRecipes'
})
export class FilterRecipesPipe implements PipeTransform {

  transform(recipes: Recipe[], searchCategory: string, searchCuisine: string, upperCalories: number, sortByVegetarian: boolean): Recipe[] {
    if (!searchCategory && !searchCuisine) {
      if (sortByVegetarian) {
      return recipes.filter((recipe) => recipe.calories <= upperCalories && recipe.is_vegetarian==sortByVegetarian);
    }
      return recipes.filter((recipe) => recipe.calories <= upperCalories);  
    }
    return recipes.filter((recipe) => {
      if (sortByVegetarian) {
        return recipe.category.toLowerCase().includes(searchCategory.toLowerCase()) && 
               recipe.cuisine.toLowerCase().includes(searchCuisine.toLowerCase()) && 
               recipe.calories <= upperCalories && recipe.is_vegetarian==sortByVegetarian;
      }
      return recipe.category.toLowerCase().includes(searchCategory.toLowerCase()) && 
             recipe.cuisine.toLowerCase().includes(searchCuisine.toLowerCase()) && 
             recipe.calories <= upperCalories;
    });
  }
}
