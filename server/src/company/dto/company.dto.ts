import { IsString, Length } from 'class-validator';

export class CompanyDto {
  @IsString()
  @Length(11, 11)
  oib: string;

  @IsString()
  name: string;
}
