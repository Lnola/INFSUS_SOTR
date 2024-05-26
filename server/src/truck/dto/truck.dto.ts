import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';
import { TransportVehicleDto } from 'shared/models/transport-vehicle/transport-vehicle.dto';

export class TruckDto extends TransportVehicleDto {
  @IsNotEmpty()
  @IsNumberString()
  tankCapacity: number;

  @IsOptional()
  @IsNumberString()
  horsepower: number;
}
