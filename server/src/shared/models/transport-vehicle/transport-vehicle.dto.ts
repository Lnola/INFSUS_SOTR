import { IsNotEmpty, IsNumberString, IsOptional, MinLength } from 'class-validator';
import { IsRegistration } from 'shared/validators/is-registration.validator';

export class TransportVehicleDto {
  @IsNotEmpty()
  @IsRegistration()
  registration: string;

  @IsOptional()
  @IsNumberString()
  @MinLength(4)
  productionYear?: string;
}
