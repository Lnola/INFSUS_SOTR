import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'shared/decorators/pagination.decorator';
import { CreateDriverDto } from './dto/create-driver.dto';
import Driver from './entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: EntityRepository<Driver>,
  ) {}

  async find({ page, pageSize }: PaginationParams) {
    const paginationOptions = {
      offset: page * pageSize,
      limit: pageSize,
    };
    const [items, count] = await this.driverRepository.findAndCount({}, paginationOptions);
    return { items, count };
  }

  async create(createDriverDto: CreateDriverDto) {
    const driver = new Driver(
      createDriverDto.firstName,
      createDriverDto.lastName,
      createDriverDto.contactNumber,
      createDriverDto.employmentStartDate,
      createDriverDto.employmentEndDate,
    );
    await this.driverRepository.getEntityManager().persistAndFlush(driver);
  }
}
