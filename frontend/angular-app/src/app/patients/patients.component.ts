import { Component, OnInit, inject, signal } from '@angular/core';
import { FilterPatientsPipe } from '../pipes/filter-patients.pipe';
import { Patient } from '../model/patient.type';
import { FetchpatientsService } from '../services/fetchpatients.service';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PatientItemsComponent } from '../components/patient-items/patient-items.component';
@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPatientsPipe, PatientItemsComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent implements OnInit {
  patientService = inject(FetchpatientsService);
  patients = signal<Array<Patient>>([]);
  searchTerm = signal('');
  ngOnInit(): void {
    this.patientService.getPatientsFromApi().
    pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    )
    .subscribe((patients: Patient[]) => {
      this.patients.set(patients);
    });
  } 
}
