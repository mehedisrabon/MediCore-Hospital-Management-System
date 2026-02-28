import { Injectable } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';

@Injectable()
export class DoctorService {
  private doctorinfo: DoctorDto[] = [
    {
      id: 1,
      name: 'Dr Rahman',
      specialization: 'Cardiologist',
      experience: 10,
      password: 'abc123',
      phone: '01712345678',
      file: 'resume1.pdf'
    },
    {
      id: 2,
      name: 'Dr Ahmed',
      specialization: 'Dermatologist',
      experience: 7,
      password: 'def456',
      phone: '01812345678',
      file: 'resume2.pdf'
    },
    {
      id: 3,
      name: 'Dr Karim',
      specialization: 'Neurologist',
      experience: 12,
      password: 'ghi789',
      phone: '01912345678',
      file: 'resume3.pdf'
    }
  ];

  getAllDoctorsinfo() {
    return { doctors: this.doctorinfo };
  }

  getDoctorById(id: number) {
    const doctor = this.doctorinfo.find(d => d.id === id);
    return doctor || { message: 'Doctor not found' };
  }

  createDoctor(data: DoctorDto) {
    this.doctorinfo.push(data);
    return { message: 'Doctor created successfully', doctor: data };
  }

  updateDoctor(id: number, data: DoctorDto) {
    const doctor = this.doctorinfo.find(d => d.id === id);
    if (!doctor) return { message: 'Doctor not found' };
    Object.assign(doctor, data);
    return { message: 'Doctor updated successfully', doctor };
  }

  patchDoctor(id: number, data: Partial<DoctorDto>) {
    const doctor = this.doctorinfo.find(d => d.id === id);
    if (!doctor) return { message: 'Doctor not found' };
    Object.assign(doctor, data);
    return { message: 'Doctor patched successfully', doctor };
  }

  deleteDoctor(id: number) {
    const index = this.doctorinfo.findIndex(d => d.id === id);
    if (index === -1) return { message: 'Doctor not found' };
    const deleted = this.doctorinfo.splice(index, 1);
    return { message: 'Doctor deleted successfully', doctor: deleted[0] };
  }

  searchDoctorByName(name: string) {
    const result = this.doctorinfo.filter(d => d.name.includes(name));
    return { result };
  }

  getDoctorByExperience(exp: number) {
    const result = this.doctorinfo.filter(d => d.experience >= exp);
    return { result };
  }
}