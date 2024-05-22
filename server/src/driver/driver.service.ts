import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'shared/decorators/pagination.decorator';
import Driver from './entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: EntityRepository<Driver>,
  ) {}

  find({ page, pageSize }: PaginationParams) {
    const paginationOptions = {
      offset: (page - 1) * pageSize,
      limit: pageSize,
    };
    return this.driverRepository.findAndCount({}, paginationOptions);
  }

  findOne(id: number) {
    return this.driverRepository.findOne(id);
  }
}
