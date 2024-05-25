import { IsDateString, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';
import { IsBeforeDate } from 'shared/validators/is-before-date.validator';

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
  @IsBeforeDate('employmentStartDate')
  employmentEndDate?: Date;
}
