import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';
import { validateOrReject } from 'class-validator';

export class PaginationParams {
  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsNumberString()
  @IsOptional()
  pageSize?: number;

  static get default() {
    return { page: '0', pageSize: '10' };
  }

  extractParams() {
    return { page: +this.page, pageSize: +this.pageSize };
  }
}

const Pagination = createParamDecorator(async (_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  request.query = { ...PaginationParams.default, ...request.query };
  const pagination = plainToClass(PaginationParams, request.query);

  try {
    await validateOrReject(pagination);
  } catch (error) {
    throw new BadRequestException(error);
  }

  return pagination.extractParams();
});

export default Pagination;
