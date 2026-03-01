import {Controller,Get,Post,Body,Param,Put,Patch,Delete,Query,UsePipes,ValidationPipe,UseInterceptors,UploadedFile,BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { extname } from 'path';
import { DoctorService } from './doctor.service';
import { DoctorDto } from './dto/doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  
  getAllDoctorsinfo() {
    return this.doctorService.getAllDoctorsinfo();
  }

  @Get(':id')
  getDoctorById(@Param('id') id: string) {
    return this.doctorService.getDoctorById(Number(id));
  }

 @Post()
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true,transform: true })) 
@UseInterceptors(
  FileInterceptor('file', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(pdf)$/i)) {
        cb(null, true);
      } else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false);
      }
    },
    limits: { fileSize: 3000000 },
    storage: diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
      },
    }),
  }),
)
createDoctor(
  @Body() data: DoctorDto,
  @UploadedFile() file: Express.Multer.File,
) {
  if (!file) {
    throw new BadRequestException('PDF file is required');
  }

  data.file = file.filename;

  return this.doctorService.createDoctor(data);
}



  @Put(':id')
updateDoctor(@Param('id') id: string, @Body() data: Partial<DoctorDto>) {
    return this.doctorService.updateDoctor(Number(id), data);
  }

  @Patch(':id')
  patchDoctor(@Param('id') id: string, @Body() data: Partial<DoctorDto>) {
    return this.doctorService.patchDoctor(Number(id), data);
  }

  @Delete(':id')
  deleteDoctor(@Param('id') id: string) {
    return this.doctorService.deleteDoctor(Number(id));
  }

  @Get('search/name')
  searchDoctor(@Query('name') name: string) {
    return this.doctorService.searchDoctorByName(name);
  }

  @Get('search/experience')
  searchDoctorExperience(@Query('exp') exp: string) {
    return this.doctorService.getDoctorByExperience(Number(exp));
  }
}