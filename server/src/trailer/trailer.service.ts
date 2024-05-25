import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationParams } from 'shared/decorators/pagination.decorator';
import Trailer from './entities/trailer.entity';
import { TrailerDto } from './trailer.dto';

@Injectable()
export class TrailerService {
  constructor(
    @InjectRepository(Trailer)
    private trailerRepository: EntityRepository<Trailer>,
  ) {}

  private em = this.trailerRepository.getEntityManager()

  async find({ page, pageSize }: PaginationParams) {
    const paginationOptions = {
      offset: page * pageSize,
      limit: pageSize,
    };
    const [items, count] = await this.trailerRepository.findAndCount({}, paginationOptions);
    return { items, count };
  }

  findOne(id: number) {
    return this.trailerRepository.findOne(id);
  }

  async create(trailerDto: TrailerDto){
    const trailer = new Trailer(
      trailerDto.registration,
      trailerDto.productionYear,
      Number(trailerDto.palletCapacity),
      Number(trailerDto.length),
    )
    await this.em.persist(trailer).flush()
    return trailer.id
  }

  async update(id: number, trailerDto: TrailerDto){
    const savedTrailer = await this.trailerRepository.findOne(id)
    if (!savedTrailer) {
      throw new NotFoundException(`Trailer with ID ${id} not found`);
    }
    const trailer = new Trailer(
      trailerDto.registration,
      trailerDto.productionYear,
      Number(trailerDto.palletCapacity),
      Number(trailerDto.length),
    )
    wrap(savedTrailer).assign(trailer)
    await this.em.flush()

    return id
  }

  async remove(id: number) {
    const trailer = await this.trailerRepository.findOne(id);
    if (!trailer) {
      throw new NotFoundException(`Trailer with ID ${id} not found`);
    }
    await this.em.removeAndFlush(trailer);
    return id
  }
}

