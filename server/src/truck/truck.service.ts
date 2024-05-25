import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import Truck from './entities/truck.entity';

@Injectable()
export class TruckService {
  constructor(
    @InjectRepository(Truck)
    private truckRepository: EntityRepository<Truck>,
  ) {}

  findAll() {
    return this.truckRepository.findAll();
  }

  findOne(id: number) {
    return this.truckRepository.findOne(id);
  }
}

