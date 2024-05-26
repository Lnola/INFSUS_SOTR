import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';
import { TransportVehicleDto } from 'shared/models/transport-vehicle/transport-vehicle.dto';

export class TrailerDto extends TransportVehicleDto {
  @IsNotEmpty()
  @IsNumberString()
  palletCapacity: number;

  @IsOptional()
  @IsNumberString()
  length?: number;
}
