import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LogisticsOperationDto } from './dto/logistics-operation.dto';
import LogisticsOperation from './entities/logistics-operation.entity';

@Injectable()
export class LogisticsOperationService {
  constructor(
    @InjectRepository(LogisticsOperation)
    private logisticsOperationRepository: EntityRepository<LogisticsOperation>,
  ) {}


  findAll(){
    return this.logisticsOperationRepository.findAll();
  }


  findOne(id: number) {
    return this.logisticsOperationRepository.findOne(id);
  }

  async create(logisticsOperationDto: LogisticsOperationDto) {
    try {
      const logisticsOperation = new LogisticsOperation(
        logisticsOperationDto.date,
        logisticsOperationDto.isCompleted,
        logisticsOperationDto.note,
        logisticsOperationDto.companyLocation,
        logisticsOperationDto.type,
        logisticsOperationDto.order,
      );
      await this.logisticsOperationRepository.getEntityManager().persistAndFlush(logisticsOperation);
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Logistics operation with this value already exists!');

      throw error;
    }
  }

  async update(id: number, logisticsOperationDto: LogisticsOperationDto) {
    const logisticsOperation = await this.logisticsOperationRepository.findOne(id);
    if (!logisticsOperation) throw new NotFoundException('Logistics operation not found!');
    logisticsOperation.date = logisticsOperationDto.date;
    logisticsOperation.isCompleted = logisticsOperationDto.isCompleted;
    logisticsOperation.note = logisticsOperationDto.note;
    logisticsOperation.companyLocation = logisticsOperationDto.companyLocation;
    logisticsOperation.type = logisticsOperationDto.type;
    logisticsOperation.order = logisticsOperationDto.order;
    return await this.logisticsOperationRepository.getEntityManager().persistAndFlush(logisticsOperation);
  }

  async delete(id: number) {
    const logisticsOperation = await this.logisticsOperationRepository.findOne(id);
    if (!logisticsOperation) throw new NotFoundException('Logistics operation not found!');
    return this.logisticsOperationRepository.getEntityManager().removeAndFlush(logisticsOperation);
  }
}
