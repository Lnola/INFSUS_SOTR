import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      const driver = new Driver(
        createDriverDto.firstName,
        createDriverDto.lastName,
        createDriverDto.contactNumber,
        createDriverDto.employmentStartDate,
        createDriverDto.employmentEndDate,
      );
      await this.driverRepository.getEntityManager().persistAndFlush(driver);
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Driver with this contact number already exists!');

      throw error;
    }
  }

  async update(id: number, updateDriverDto: CreateDriverDto) {
    const driver = await this.driverRepository.findOne(id);
    if (!driver) throw new NotFoundException('Driver not found!');
    driver.firstName = updateDriverDto.firstName;
    driver.lastName = updateDriverDto.lastName;
    driver.contactNumber = updateDriverDto.contactNumber;
    driver.employmentStartDate = updateDriverDto.employmentStartDate;
    driver.employmentEndDate = updateDriverDto.employmentEndDate;
    return await this.driverRepository.getEntityManager().persistAndFlush(driver);
  }
}
