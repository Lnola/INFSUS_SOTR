import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import Driver from './entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: EntityRepository<Driver>,
  ) {}

  findAll() {
    return this.driverRepository.findAll();
  }

  findOne(id: number) {
    return this.driverRepository.findOne(id);
  }
}
