import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class ReceptionistService {

  private patients = [
    { name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890', patientNID: '1234567890' },
    { name: 'Jane Smith', email: 'jane.smith@xyz.com', phone: '9987654321', patientNID: '9876543218' }
  ];
  private appointments= [
    { appointmentId: 1, patientId: 1, doctorId: 1, date: '2024-07-01', time: '10:00' },
    { appointmentId: 2, patientId: 2, doctorId: 2, date: '2024-07-02', time: '14:00' },
    { appointmentId: 3, patientId: 5, doctorId: 10, date: '2026-07-03', time: '09:00' }
  ];
  private invoices = [
     { appointmentId: 1, amount: 200 },
     { appointmentId: 2, amount: 150 },
     { appointmentId: 3, amount: 300 }
  ];

  private doctors = [
    { doctorId: 1, name: 'Dr. Smith', department: 'Cardiology' },
    { doctorId: 2, name: 'Dr. Emily', department: 'Neurology' },
  ];

  createPatient(dto: CreatePatientDto) {
    this.patients.push(dto);

    return {
      message: 'Patient registered successfully',
      patient: dto
    };
  }

 getAllPatients(search?: string) {
  if (search) {
    return this.patients.filter((patient) => patient.name === search);
  }
  return this.patients;
}

 createAppointment(dto: CreateAppointmentDto) {
    this.appointments.push(dto);

    return {
      message: 'Appointment booked successfully', 
      appointment: dto
    };
  }

  updateAppointment(id: number, dto: UpdateAppointmentDto) {
    const appointment = this.appointments[id - 1];

    if (!appointment) {
      return { message: 'Appointment not found' };
    }

    this.appointments[id - 1] = {
      ...appointment,
      ...dto,
    };

    return {
      message: 'Appointment updated successfully',
      appointment: this.appointments[id - 1],
    };
  }

  rescheduleAppointment(id: number, dto: RescheduleAppointmentDto) {
  const appointment = this.appointments.find(
    (appt) => appt.appointmentId === id,
  );

  if (!appointment) {
    return { message: 'Appointment not found' };
  }

  appointment.date = dto.date;
  appointment.time = dto.time;

  return {
    message: 'Appointment rescheduled successfully',
    appointment
  };
}

  cancelAppointment(id: number) {
    const appointment = this.appointments[id - 1];

    if (!appointment) {
      return { message: 'Appointment not found' };
    }

    return {
      message: 'Appointment cancelled successfully',
      appointment
    };
  }

  getDoctors() {
    return this.doctors;
  }


  createInvoice(dto: CreateInvoiceDto) {
    this.invoices.push(dto);

    return {
      message: 'Invoice generated successfully',
      invoice: dto,
    };
  }
}