import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from '../model/patient.type';

@Pipe({
  name: 'filterPatients'
})
export class FilterPatientsPipe implements PipeTransform {

  transform(patients: Patient[], searchTerm: string): Patient[] {
    if (!searchTerm) {
      return patients;
    }
    const text = searchTerm.toLowerCase();
    return patients.filter((patient) => {
      return patient.name.toLowerCase().includes(text);
    });
  }

}
