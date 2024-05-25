import { IsDateString, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateDriverDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber('HR')
  contactNumber: string;

  @IsNotEmpty()
  @IsDateString()
  employmentStartDate: Date;

  @IsOptional()
  @IsDateString()
  employmentEndDate?: Date;
}
