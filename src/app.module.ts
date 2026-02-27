import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceptionistController } from './receptionist/receptionist.controller';
import { ReceptionistService } from './receptionist/receptionist.service';
import { ReceptionistModule } from './receptionist/receptionist.module';

@Module({
  imports: [ReceptionistModule],
  controllers: [AppController, ReceptionistController],
  providers: [AppService, ReceptionistService],
})
export class AppModule {}
