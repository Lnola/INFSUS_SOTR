import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyDto } from './dto/company.dto';
import Company from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: EntityRepository<Company>,
  ) {}


  findAll(){
    return this.companyRepository.findAll();
  }


  findOne(id: number) {
    return this.companyRepository.findOne(id);
  }

  async create(companyDto: CompanyDto) {
    try {
      const company = new Company(
        companyDto.oib,
        companyDto.name,
      );
      await this.companyRepository.getEntityManager().persistAndFlush(company);
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Company with this OIB number already exists!');

      throw error;
    }
  }

  async update(id: number, companyDto: CompanyDto) {
    const company = await this.companyRepository.findOne(id);
    if (!company) throw new NotFoundException('Company not found!');
    company.oib = companyDto.oib;
    company.name = companyDto.name;
    return await this.companyRepository.getEntityManager().persistAndFlush(company);
  }

  async delete(id: number) {
    const company = await this.companyRepository.findOne(id);
    if (!company) throw new NotFoundException('Company not found!');
    return this.companyRepository.getEntityManager().removeAndFlush(company);
  }
}
