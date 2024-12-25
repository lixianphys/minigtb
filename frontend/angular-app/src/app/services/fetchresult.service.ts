import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchresultService {
  private apiUrl = 'http://localhost:8000/fetch-result'; // Backend URL

  constructor(private http: HttpClient) {}

  fetchResult(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
