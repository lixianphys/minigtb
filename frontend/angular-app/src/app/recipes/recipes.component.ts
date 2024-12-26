import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Recipe } from '../model/recipe.type';
import { FilterRecipesPipe } from '../pipes/filter-recipes.pipe';
import { FormsModule } from '@angular/forms';
import { RecipeItemsComponent } from '../components/recipe-items/recipe-items.component';
import { catchError } from 'rxjs';
import { FetchrecipesService } from '../services/fetchrecipes.service';

@Component({
  selector: 'app-recipes',
  imports: [FilterRecipesPipe, FormsModule, RecipeItemsComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit {
  recipeService = inject(FetchrecipesService);  
  recipes = signal<Array<Recipe>>([]);
  searchCategory = signal('');
  searchCuisine = signal('');
  upperCalories = signal(Infinity);
  sortByVegetarian = signal(false);
  ngOnInit(): void {
    this.recipeService.getRecipesFromApi().
    pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    )
    .subscribe((recipes: Recipe[]) => {
      this.recipes.set(recipes);
    });
  }
}
