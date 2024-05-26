import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import CompanyLocation from 'company-location/entities/company-location.entity';
import LogisticsOperationType from 'logistics-operation/entities/logistics-operation-type.entity';
import Order from 'order/entities/order.entity';

export class LogisticsOperationDto {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsBoolean()
  isCompleted: boolean;

  @IsString()
  @IsOptional()
  note?: string;

  @IsNumber()
  companyLocation: CompanyLocation;

  @IsNumber()
  type: LogisticsOperationType;

  @IsNumber()
  order: Order;
}
