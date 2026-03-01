import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsInt,
  IsPositive,
  MinLength,
  Matches,
  IsOptional 
} from 'class-validator';
import { Type } from 'class-transformer';

export class DoctorDto {
@IsOptional()  
   id: number; 

  @IsDefined()
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name must contain only letters' })
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsDefined()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  experience: number;

@IsDefined()
@IsString()
@MinLength(6, { message: 'Password must be at least 6 characters long' })
@Matches(/^(?=.*[a-z]).*$/, { message: 'Password must contain at least one lowercase letter' })
password: string;

@IsDefined()
  @Matches(/^01[0-9]{9}$/, { message: 'Phone must be 11 digits starting with 01' })
  phone: string;



@IsOptional()  
  file?: string;
}