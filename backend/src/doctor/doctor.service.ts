import { Injectable } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';

@Injectable()
export class DoctorService {
  private doctorinfo: DoctorDto[] = [
    {
      name: 'Dr Rahman',
      specialization: 'Cardiologist',
      experience: 10,
      password: 'abc123',
      phone: '01712345678',
      file: 'resume1.pdf'
    },
    {
      name: 'Dr Ahmed',
      specialization: 'Dermatologist',
      experience: 7,
      password: 'def456',
      phone: '01812345678',
      file: 'resume2.pdf'
    },
    {
      name: 'Dr Karim',
      specialization: 'Neurologist',
      experience: 12,
      password: 'ghi789',
      phone: '01912345678',
      file: 'resume3.pdf'
    }
  ].map((d, index) => ({ id: index + 1, ...d }));  


  getAllDoctorsinfo() {
    const doctors = this.doctorinfo.map(({ password, ...rest }) => rest);
    return { doctors };
  }


  getDoctorById(id: number) {
    const doctor = this.doctorinfo.find(d => d.id === id);
    if (!doctor) return { message: 'Doctor not found' };

    const { password, ...result } = doctor;
    return result;
  }



 createDoctor(data: DoctorDto) {

  const newDoctor: DoctorDto = {
    ...data,                         
    id: this.doctorinfo.length + 1  
  };

  this.doctorinfo.push(newDoctor);

  const { password, ...result } = newDoctor;
  return { message: 'Doctor created successfully', doctor: result };
}



  updateDoctor(id: number, data: Partial<DoctorDto>) {
    const doctor = this.doctorinfo.find(d => d.id === id);
    if (!doctor) return { message: 'Doctor not found' };

    Object.assign(doctor, data);

    const { password, ...result } = doctor;
    return { message: 'Doctor updated successfully', doctor: result };
  }




  patchDoctor(id: number, data: Partial<DoctorDto>) {
    const doctor = this.doctorinfo.find(d => d.id === id);
    if (!doctor) return { message: 'Doctor not found' };

    Object.assign(doctor, data);

    const { password, ...result } = doctor;
    return { message: 'Doctor patched successfully', doctor: result };
  }




  deleteDoctor(id: number) {
    const index = this.doctorinfo.findIndex(d => d.id === id);
    if (index === -1) return { message: 'Doctor not found' };
    const deleted = this.doctorinfo.splice(index, 1);
    return { message: 'Doctor deleted successfully', doctor: deleted[0] };
  }




  searchDoctorByName(name: string) {
    const result = this.doctorinfo
      .filter(d => d.name.includes(name))
      .map(({ password, ...rest }) => rest);

    return { result };
  }



  
  getDoctorByExperience(exp: number) {
    const result = this.doctorinfo
      .filter(d => d.experience >= exp)
      .map(({ password, ...rest }) => rest);

    return { result };
  }
}