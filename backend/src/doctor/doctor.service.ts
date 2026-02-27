import { Injectable } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';

@Injectable()
export class DoctorService {

private doctorinfo=[

{
id:1,
name:'Dr. Rahman',
specialization:'Cardiologist',
experience:10
},

{
id:2,
name:'Dr. Ahmed',
specialization:'Dermatologist',
experience:7
},

{
id:3,
name:'Dr. Karim',
specialization:'Neurologist',
experience:12
}

];



getAllDoctorsinfo():object{

return {doctors:this.doctorinfo};

}



getDoctorById(id:number):object{

const doctor=this.doctorinfo.find(doc=>doc.id===id);

if(!doctor)
return {message:"Doctor not found"};

return doctor;

}



createDoctor(data:DoctorDto):object{

this.doctorinfo.push(data);

return {

message:"Doctor created successfully",

doctor:data

};

}



updateDoctor(id:number,data:DoctorDto):object{

const doctor=this.doctorinfo.find(doc=>doc.id===id);

if(!doctor)
return {message:"Doctor not found"};

doctor.name=data.name;
doctor.specialization=data.specialization;
doctor.experience=data.experience;

return {

message:"Doctor updated successfully",

doctor

};

}



patchDoctor(id:number,data:Partial<DoctorDto>):object{

const doctor=this.doctorinfo.find(doc=>doc.id===id);

if(!doctor)
return {message:"Doctor not found"};

Object.assign(doctor,data);

return {

message:"Doctor patched successfully",

doctor

};

}



deleteDoctor(id:number):object{

const index=this.doctorinfo.findIndex(doc=>doc.id===id);

if(index==-1)
return {message:"Doctor not found"};

const deleted=this.doctorinfo.splice(index,1);

return {

message:"Doctor deleted successfully",

doctor:deleted[0]

};

}



searchDoctorByName(name:string):object{

const result=this.doctorinfo.filter(doc=>doc.name.includes(name));

return {result};

}



getDoctorByExperience(exp:number):object{

const result=this.doctorinfo.filter(doc=>doc.experience>=exp);

return {result};

}



}