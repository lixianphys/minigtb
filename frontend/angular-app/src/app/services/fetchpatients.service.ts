import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../model/patient.type';

@Injectable({
  providedIn: 'root'
})
export class FetchpatientsService {
  http = inject(HttpClient);
  getPatientsFromApi() {
    const url = 'http://localhost:8000/patient_database';
    return this.http.get<Array<Patient>>(url);
  }
  getPatientById(id: number) {
    const url = `http://localhost:8000/patient_database/${id}`;
    return this.http.get<Patient>(url);
  }
}
