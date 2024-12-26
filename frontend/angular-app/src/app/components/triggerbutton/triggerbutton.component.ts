import { Component, signal } from '@angular/core';
import { ScriptService } from '../../services/trigger.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FetchresultService } from '../../services/fetchresult.service';
import { Recipe } from '../../model/recipe.type';
import { FetchrecipesService } from '../../services/fetchrecipes.service';
import { Patient } from '../../model/patient.type';
import { FetchpatientsService } from '../../services/fetchpatients.service';

interface MatchResult {
  recipe_ids: number[];
  similarities: number[];
}

@Component({
  selector: 'app-triggerbutton',
  standalone: true,
  templateUrl: './triggerbutton.component.html',
  styleUrl: './triggerbutton.component.scss',
  imports: [NgIf, FormsModule],
})
export class TriggerbuttonComponent {
  patient_id: number = 0;
  the_patient: Patient | null = null;
  num_recommendations: number = 0;
  responseMessage: string = '';
  resultContent: MatchResult | null = null;
  recommended_recipes = signal<Array<Recipe>>([]);
  activeRecipe: any = null;
  constructor(private scriptService: ScriptService, private fetchresultService: FetchresultService, private fetchrecipesService: FetchrecipesService, private fetchpatientsService: FetchpatientsService) {}

  onTriggerScript(): void {
    
    this.scriptService.triggerScript(this.patient_id, this.num_recommendations).subscribe({
      next: (response: MatchResult) => {
        this.resultContent = response;
        this.fetchrecipesService.getRecipesByIds(response.recipe_ids.toString()).subscribe(recipes => {
          this.recommended_recipes.set(recipes);
        });
        this.fetchpatientsService.getPatientById(this.patient_id).subscribe(patient => {
          this.the_patient = patient;
        });
      },
      error: (error) => {
        console.error('Error:', error);
        this.responseMessage = 'Error triggering script';
      }
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
