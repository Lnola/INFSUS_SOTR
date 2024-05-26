import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, UniqueConstraintViolationException, wrap } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationParams } from 'shared/decorators/pagination.decorator';
import { TruckDto } from './dto/truck.dto';
import Truck from './entities/truck.entity';

@Injectable()
export class TruckService {
  constructor(
    @InjectRepository(Truck)
    private truckRepository: EntityRepository<Truck>,
  ) {}

  private em = this.truckRepository.getEntityManager();

  async find({ page, pageSize }: PaginationParams) {
    const paginationOptions = {
      offset: page * pageSize,
      limit: pageSize,
    };
    const [items, count] = await this.truckRepository.findAndCount({}, paginationOptions);
    return { items, count };
  }

  findOne(id: number) {
    return this.truckRepository.findOne(id);
  }

  async create(truckDto: TruckDto) {
    try {
      const truck = new Truck(
        truckDto.registration,
        truckDto.productionYear,
        Number(truckDto.tankCapacity),
        Number(truckDto.horsepower),
      );
      await this.em.persist(truck).flush();
      return truck.id;
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Driver with this contact number already exists!');

      throw error;
    }
  }

  // TODO: implement similar to other implementations
  async update(id: number, truckDto: TruckDto) {
    const savedTruck = await this.truckRepository.findOne(id);
    if (!savedTruck) {
      throw new NotFoundException(`Truck with ID ${id} not found`);
    }
    const truck = new Truck(
      truckDto.registration,
      truckDto.productionYear,
      Number(truckDto.tankCapacity),
      Number(truckDto.horsepower),
    );
    wrap(savedTruck).assign(truck);
    await this.em.flush();

    return id;
  }

  async remove(id: number) {
    const truck = await this.truckRepository.findOne(id);
    if (!truck) {
      throw new NotFoundException(`Truck with ID ${id} not found`);
    }
    await this.em.removeAndFlush(truck);
    return id;
  }
}
