import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { ReceptionistModule } from './receptionist/receptionist.module';
import { DoctorModule } from './doctor/doctor.module';
import { DoctorController } from './doctor/doctor.controller';
import { ReceptionistController } from './receptionist/receptionist.controller';
import { DoctorService } from './doctor/doctor.service';
import { ReceptionistService } from './receptionist/receptionist.service';
import { AdminModule } from './admin/admin.module';
@Module({
  imports: [PatientModule,ReceptionistModule,DoctorModule,AdminModule],
  controllers: [AppController,PatientController,ReceptionistController,DoctorController],
  providers: [AppService,PatientService,ReceptionistService,DoctorService],
})
export class AppModule {}
