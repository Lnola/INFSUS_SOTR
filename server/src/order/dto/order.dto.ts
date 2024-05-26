import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsNumber()
  transportPrice: number;

  @IsNotEmpty()
  @IsNumber()
  distance: number;

  @IsNotEmpty()
  @IsNumber()
  truckId: number;

  @IsNotEmpty()
  @IsNumber()
  trailerId: number;

  @IsNotEmpty()
  @IsNumber()
  financerId: number;

  @IsNotEmpty()
  @IsNumber()
  statusId: number;
}
