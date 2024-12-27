import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScriptService } from '../../services/trigger.service';
import { FetchresultService } from '../../services/fetchresult.service';
import { FetchrecipesService } from '../../services/fetchrecipes.service';
import { FetchpatientsService } from '../../services/fetchpatients.service';
import { Recipe } from '../../model/recipe.type';
import { Patient } from '../../model/patient.type';


interface MatchResult {
  recipe_ids: number[];
  similarities: number[];
}

@Component({
  selector: 'app-triggerbutton',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './triggerbutton.component.html',
  styleUrl: './triggerbutton.component.scss'
})
export class TriggerbuttonComponent {
  the_patient: Patient | null = null;
  resultContent: MatchResult | null = null;
  recommended_recipes = signal<Array<Recipe>>([]);
  activeRecipe: any = null;
  errorMessage: string = '';
  constructor(private scriptService: ScriptService, private fetchrecipesService: FetchrecipesService, private fetchpatientsService: FetchpatientsService, private fetchresultService: FetchresultService) {}


  onSubmit(f: NgForm): void {
    this.scriptService.triggerScript(f.value.patientID, f.value.numRecommendations).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Error triggering script:', error);
        this.errorMessage = 'Failed to trigger script. Please try again later.';
      }
    });
  }
  
  onFetch(f: NgForm): void {
    this.fetchresultService.fetchResult().subscribe({
      next: (response: MatchResult) => {
        this.resultContent = response;
        this.fetchrecipesService.getRecipesByIds(response.recipe_ids.toString()).subscribe({
          next: (recipes) => {
            this.recommended_recipes.set(recipes);
          },
          error: (error) => {
            console.error('Error fetching recipes:', error);
            this.errorMessage = 'Failed to fetch recipe recommendations. Please try again later.';
          }
        });
        
        this.fetchpatientsService.getPatientById(f.value.patientID).subscribe({
          next: (patient) => {
            this.the_patient = patient;
          },
          error: (error) => {
            console.error('Error fetching patient:', error);
            this.errorMessage = 'Failed to fetch patient information. Please verify the patient ID.';
          }
        });
      },
    });
}

  showDetails(element: HTMLElement) {
    element.style.display = 'block';
  }

  hideDetails(element: HTMLElement) {
    element.style.display = 'none';
  }

  showPopup(event: MouseEvent, recipe: any) {
    this.activeRecipe = recipe;
  }

  hidePopup() {
    this.activeRecipe = null;
  }
}
