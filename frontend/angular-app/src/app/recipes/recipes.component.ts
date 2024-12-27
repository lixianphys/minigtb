import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Recipe } from '../model/recipe.type';
import { FilterRecipesPipe } from '../pipes/filter-recipes.pipe';
import { FormsModule } from '@angular/forms';
import { RecipeItemsComponent } from '../components/recipe-items/recipe-items.component';
import { catchError } from 'rxjs';
import { FetchrecipesService } from '../services/fetchrecipes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FilterRecipesPipe,
    RecipeItemsComponent
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
  providers: [FetchrecipesService]
})
export class RecipesComponent implements OnInit {
  recipeService = inject(FetchrecipesService);  
  recipes = signal<Array<Recipe>>([]);
  searchCategory = signal('');
  searchCuisine = signal('');
  upperCalories = signal(Infinity);
  OnlyVegetarian = signal(false);
  searchID = signal(-Infinity);
  ngInfinity = signal(-Infinity);
  ngOnInit(): void {
    this.recipeService.getRecipesFromApi()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipes.set(recipes);
      });
  }

  onSearchIDChange(value: number) {
    this.searchID.set(value);
    if (value<0) {
        this.recipeService.getRecipesFromApi()
            .subscribe(recipes => {
                this.recipes.set(recipes);
            });
    } else {
        this.recipeService.getRecipeById(value)
            .subscribe(recipe => {
                this.recipes.set([recipe]);
            });
    }
  }
}
