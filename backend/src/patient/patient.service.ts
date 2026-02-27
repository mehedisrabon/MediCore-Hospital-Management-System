import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './DTO/createPatient.dto';
@Injectable()
export class PatientService {
    private patients = [
        { id: 1, name: 'Mehedi', age: 23 }, 
        { id: 2, name: 'Ibraheem', age: 18 }, 
        { id: 3, name: 'Aka', age: 24 },
    ];

 getAllPatients() {
  return {
    message: 'All patients fetched',
    data: this.patients,
  };
}
    searchByName(name: string) {
  const result = this.patients.filter(p =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  if (result.length === 0) {
    throw new NotFoundException('No patient found with this name!');
  }

  return {
    message: 'Patients found',
    data: result,
  };
}
    getPatientById(id: number){
        const patient = this.patients.find((s) => s.id === id);
        if(!patient) throw new NotFoundException('Patient not Found!');
        return patient;
    }
    
   createPatient(data: CreatePatientDto){
        const newPatient = {
            id: Date.now(),
            ...data,
        };
        this.patients.push(newPatient);
        return newPatient;
    }

   
    updatePatient(id: number, data: {name: string; age: number}){
        const index = this.patients.findIndex((p) => p.id === id);
        if(index === -1) throw new NotFoundException('Patient not found!');
        this.patients[index] = { id, ...data};
        return this.patients[index];
    }

    
    patchPatient(id: number, data: Partial<{ name: string; age: number}>){
        const patient = this.getPatientById(id);
        Object.assign(patient, data);
        return patient;
    }

    deletePatient(id: number){
        const index = this.patients.findIndex((p) => p.id === id);
        if(index === -1) throw new NotFoundException('Patient not found!');
        const deleted = this.patients.splice(index,1) 
        return { message: 'Patient Deleted', patient: deleted[0]};
    }


    
    filterByAge(age: number) {
  const result = this.patients.filter(p => p.age === age);

  if (result.length === 0) {
    throw new NotFoundException('No patient found with this age!');
  }

  return {
    message: 'Patients found',
    data: result,
  };
}
}
