import {Controller,Get,Post,Put,Patch, Delete,Param,Body,Query,UsePipes,ValidationPipe,UseInterceptors,UploadedFile} from '@nestjs/common';
import { ReceptionistService } from './receptionist.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MulterError } from 'multer';

@Controller('receptionist')
export class ReceptionistController {
    
  constructor(private readonly receptionistService: ReceptionistService) {}

  @Post('patients')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
  FileInterceptor('nidImage', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
        cb(null, true);
      } else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'nidImage'), false);
      }
    },
    limits: { fileSize: 2000000 }, 
    storage: diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
      },
    }),
  }),
)
registerPatient(
  @Body() mydata: CreatePatientDto,
  @UploadedFile() nidImage: Express.Multer.File,
): object {

  console.log(nidImage.originalname);

  mydata['filename'] = nidImage.filename;

  return this.receptionistService.createPatient(mydata);
}

  @Get('patients')
  getAllPatients(@Query('search') search?: string) {
    return this.receptionistService.getAllPatients(search);
  }

  @Post('appointments')
  createAppointment(@Body() dto: CreateAppointmentDto) {
    return this.receptionistService.createAppointment(dto);
  }

  @Put('appointments/:id')
  updateAppointment(@Param('id') id: string,@Body() dto: UpdateAppointmentDto,) {
    return this.receptionistService.updateAppointment(Number(id), dto);
  }

  @Patch('appointments/:id/reschedule')
  rescheduleAppointment(@Param('id') id: string,@Body() dto: RescheduleAppointmentDto,) {
    return this.receptionistService.rescheduleAppointment(Number(id), dto);
  }

  @Delete('appointments/:id')
  cancelAppointment(@Param('id') id: string) {
    return this.receptionistService.cancelAppointment(Number(id));
  }

  @Get('doctors')
  getDoctors() {
    return this.receptionistService.getDoctors();
  }

  @Post('invoices')
  createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.receptionistService.createInvoice(dto);
  }
}