import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import CompanyLocation from './entities/company-location.entity';

@Injectable()
export class CompanyLocationService {
  constructor(
    @InjectRepository(CompanyLocation)
    private companyLocationRepository: EntityRepository<CompanyLocation>,
  ) {}

  findAll() {
    return this.companyLocationRepository.findAll();
  }

  findOne(id: number) {
    return this.companyLocationRepository.findOne(id);
  }
}
