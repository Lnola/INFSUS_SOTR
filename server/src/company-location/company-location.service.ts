import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyLocationDto } from './dto/company-location.dto';
import CompanyLocation from './entities/company-location.entity';

@Injectable()
export class CompanyLocationService {
  constructor(
    @InjectRepository(CompanyLocation)
    private companyLocationRepository: EntityRepository<CompanyLocation>,
  ) {}

  private em = this.companyLocationRepository.getEntityManager()

  findAll() {
    return this.companyLocationRepository.findAll();
  }

  findOne(id: number) {
    return this.companyLocationRepository.findOne(id);
  }

  async create(companyLocationDto: CompanyLocationDto){
    const companyLocation = new CompanyLocation(
      companyLocationDto.street,
      companyLocationDto.zip,
      companyLocationDto.city,
      companyLocationDto.country,
      companyLocationDto.name,
      companyLocationDto.company,
    )
    await this.em.persist(companyLocation).flush()
    return companyLocation.id
  }

  async update(id: number, companyLocationDto: CompanyLocationDto){
    const savedCompanyLocation = await this.companyLocationRepository.findOne(id)
    if (!savedCompanyLocation) {
      throw new NotFoundException(`Company location with ID ${id} not found`);
    }
    const companyLocation = new CompanyLocation(
      companyLocationDto.street,
      companyLocationDto.zip,
      companyLocationDto.city,
      companyLocationDto.country,
      companyLocationDto.name,
      companyLocationDto.company,
    )
    wrap(savedCompanyLocation).assign(companyLocation)
    await this.em.flush()

    return id
  }

  async remove(id: number) {
    const companyLocation = await this.companyLocationRepository.findOne(id);
    if (!companyLocation) {
      throw new NotFoundException(`Company location with ID ${id} not found`);
    }
    await this.em.removeAndFlush(companyLocation);
    return id
  }
}
