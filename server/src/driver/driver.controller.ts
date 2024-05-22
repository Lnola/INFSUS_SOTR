import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';
import { validateOrReject } from 'class-validator';
import { DriverService } from './driver.service';

class PaginationParams {
  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsNumberString()
  @IsOptional()
  pageSize?: number;
}

export const Pagination = createParamDecorator(async (_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const pagination = plainToClass(PaginationParams, request.query);

  try {
    await validateOrReject(pagination);
  } catch (error) {
    throw new BadRequestException(error);
  }

  const { page, pageSize } = pagination;
  return { page, pageSize };
});

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  async findAll(@Pagination() pagination: PaginationParams) {
    console.log('Pagination:', pagination);
    return this.driverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(+id);
  }
}
