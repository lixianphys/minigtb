import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  private apiUrl = 'http://localhost:8000/trigger-script'; // Backend URL

  constructor(private http: HttpClient) {}

  triggerScript(patient_id: number, num_recommendations: number): Observable<any> {
    return this.http.post(this.apiUrl, { patient_id, num_recommendations });
  }
}
