import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
        return import('./home/home.component').then(c => c.HomeComponent)
    },
},
{
    path: 'patients',
    loadComponent: () => {
        return import('./patients/patients.component').then(c => c.PatientsComponent)
    }
},
{
    path: 'recipes',
    loadComponent: () => {
        return import('./recipes/recipes.component').then(c => c.RecipesComponent)
    }
},
{
    path: 'details/:id',
    loadComponent: () => {
        return import('./p-details/p-details.component').then(c => c.PDetailsComponent)
    }
},
{
    path: 'recipe-details/:id',
    loadComponent: () => {
        return import('./r-details/r-details.component').then(c => c.RDetailsComponent)
    }
}]; 