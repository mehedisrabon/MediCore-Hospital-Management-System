import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
export class CreatePatientDto {
  
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/, { message: 'Name must contain only letters and spaces' })
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/\.xyz$/, {
  message: 'Email must end with .xyz domain',
}) 
  email: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{11}$/, {
  message: 'Phone number must be exactly 11 digits',
})
  phone: string;


  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/, {
  message: 'NID must be exactly 10 digits',
})
  patientNID: string;

  
}