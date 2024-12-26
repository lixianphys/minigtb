import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchpatientsService } from '../services/fetchpatients.service';
@Component({
  selector: 'app-p-details',
  imports: [],
  template: `
    <h3> Personal Details </h3>
    @if (!patientName.length) {
    <p>Loading...</p>
    }
    @else {
    <p>
      Name: {{patientName}}<br>
      Age: {{patientAge}}<br>
      Allergen: {{patientAllergen}}<br>
      Dietary Restriction: {{patientDietaryRestriction}}<br>
      Blood Sugar: {{patientBloodSugar}}<br>
      Blood Pressure: {{patientBloodPressure}}<br>
      Taste Change: {{patientTasteChange}}<br>
      Preferred Cuisine: {{patientPreferredCuisine}}
    </p>
    }
  `,
  styleUrl: './p-details.component.scss'
})
export class PDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  patientService = inject(FetchpatientsService);
  patientId=0;
  patientName='';
  patientAge=0;
  patientAllergen='';
  patientDietaryRestriction='';
  patientBloodSugar=0;
  patientBloodPressure=0;
  patientTasteChange='';
  patientPreferredCuisine='';
  constructor() {
    this.route.params.subscribe(params => {
      this.patientId = params['id'];
    });
    this.patientService.getPatientById(this.patientId).subscribe(patient => {
      this.patientName = patient.name;
      this.patientAge = patient.age;
      this.patientAllergen = patient.allergen;
      this.patientDietaryRestriction = patient.dietary_restriction;
      this.patientBloodSugar = patient.blood_sugar;
      this.patientBloodPressure = patient.blood_pressure;
      this.patientTasteChange = patient.taste_change;
      this.patientPreferredCuisine = patient.preferred_cuisine;
    });
  }
}
