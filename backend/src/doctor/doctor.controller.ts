import { Controller,Get,Param,Post,Put,Body,Patch,Delete,Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorDto } from './dto/doctor.dto';

@Controller('doctor')
export class DoctorController {

constructor(private readonly doctorService:DoctorService){}



@Get()
getAllDoctorsinfo(){

return this.doctorService.getAllDoctorsinfo();

}



@Get(':id')
getDoctorById(@Param('id')id:string){

return this.doctorService.getDoctorById(Number(id));

}



@Post()
createDoctor(@Body()data:DoctorDto){

return this.doctorService.createDoctor(data);

}



@Put(':id')
updateDoctor(
@Param('id')id:string,
@Body()data:DoctorDto
){

return this.doctorService.updateDoctor(Number(id),data);

}



@Patch(':id')
patchDoctor(
@Param('id')id:string,
@Body()data:Partial<DoctorDto>
){

return this.doctorService.patchDoctor(Number(id),data);

}



@Delete(':id')
deleteDoctor(@Param('id')id:string){

return this.doctorService.deleteDoctor(Number(id));

}



@Get('search/name')
searchDoctor(@Query('name')name:string){

return this.doctorService.searchDoctorByName(name);

}



@Get('search/experience')
searchDoctorExperience(@Query('exp')exp:string){

return this.doctorService.getDoctorByExperience(Number(exp));

}



}