import { IsDateString, IsPhoneNumber } from 'class-validator';

export class CreateDriverDto {
  firstName: string;

  lastName: string;

  @IsPhoneNumber('US')
  contactNumber: string;

  @IsDateString()
  employmentStartDate: Date;

  @IsDateString()
  employmentEndDate?: Date;
}
