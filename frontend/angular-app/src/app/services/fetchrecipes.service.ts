import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../model/recipe.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchrecipesService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getRecipesFromApi() {
    const url = 'http://localhost:8000/recipe_database';
    return this.http.get<Array<Recipe>>(url);
  }
  getRecipeById(id:number) {
    const url = `http://localhost:8000/recipe_database/${id}`;
    return this.http.get<Recipe>(url);
  }
  getRecipesByIds(ids: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipe_database/ids/${ids}`);
  }
}
