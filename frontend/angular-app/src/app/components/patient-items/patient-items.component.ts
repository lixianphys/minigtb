import { Component, input, output } from '@angular/core';
import { Patient } from '../../model/patient.type';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-patient-item',
  imports: [RouterLink],
  templateUrl: './patient-items.component.html',
  styleUrl: './patient-items.component.scss'
})
export class PatientItemsComponent {
  patient = input.required<Patient>();
}
