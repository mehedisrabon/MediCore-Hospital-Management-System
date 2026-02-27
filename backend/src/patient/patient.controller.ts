
import { Body, Controller, Delete, Get, Param, Patch, Post, Put,  Query  } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './DTO/createPatient.dto';
@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService){};

    @Get()
    getAll(){
        return this.patientService.getAllPatients();
    }

    @Get(':id')
    getOne(@Param('id') id: string){
        return this.patientService.getPatientById(Number(id))
    }
      @Get('search/by-name')
    searchByName(@Query('name') name: string){
        return this.patientService.searchByName(name);
    }
    @Get('filter/by-age')
filterByAge(@Query('age') age: string) {
    return this.patientService.filterByAge(Number(age));
}

@Post()
create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.createPatient(createPatientDto);
}

    @Put(':id')
    update(@Param('id') id: string, @Body() body: { name: string; age: number} ){
        return this.patientService.updatePatient(Number(id), body);
    }
    @Patch(':id')
    patch(@Param('id') id: string, @Body() body: Partial<{ name: string; age: number}> ){
        return this.patientService.patchPatient(Number(id), body);
    }
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.patientService.deletePatient(Number(id));
    }

}