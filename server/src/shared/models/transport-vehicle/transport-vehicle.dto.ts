import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { IsRegistration } from 'shared/validators/is-registration.validator';

export class TransportVehicleDto {
  @IsNotEmpty()
  @IsRegistration()
  registration: string;

  @IsOptional()
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  productionYear?: string;
}
