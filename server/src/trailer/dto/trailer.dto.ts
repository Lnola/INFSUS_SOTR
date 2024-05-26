import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { TransportVehicleDto } from 'shared/models/transport-vehicle/transport-vehicle.dto';

export class TrailerDto extends TransportVehicleDto {
  @IsNotEmpty()
  @IsNumber()
  palletCapacity: number;

  @IsOptional()
  @IsNumber()
  length?: number;
}
