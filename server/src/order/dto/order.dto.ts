import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  transportPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  distance: number;

  @IsNotEmpty()
  @IsString()
  truckRegistration: string;

  @IsNotEmpty()
  @IsString()
  trailerRegistration: string;

  @IsNotEmpty()
  @IsString()
  financer: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
