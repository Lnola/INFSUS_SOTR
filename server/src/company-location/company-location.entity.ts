import { Entity, Property, ManyToOne, Unique, OneToMany, Collection } from '@mikro-orm/core';
import Company from 'company/company.entity';
import LogisticsOperation from 'logistics-operation/logistics-operation.entity';
import BaseEntity from 'shared/database/base.entity';

@Entity({ tableName: 'company_location' })
class CompanyLocation extends BaseEntity {
  @Property()
  street: string;

  @Property()
  zip: string;

  @Property()
  city: string;

  @Property()
  country: string;

  @Property()
  @Unique()
  name: string;

  @ManyToOne({ entity: () => Company, fieldName: 'companyId' })
  company: Company;

  // TODO: decide if it needs to be private and eager
  @OneToMany({
    entity: () => LogisticsOperation,
    mappedBy: (it: LogisticsOperation) => it.companyLocation,
    orphanRemoval: true,
    eager: false,
  })
  _logisticsOperations = new Collection<LogisticsOperation>(this);

  constructor(street: string, zip: string, city: string, country: string, name: string, company: Company) {
    super();
    this.street = street;
    this.zip = zip;
    this.city = city;
    this.country = country;
    this.name = name;
    this.company = company;
  }
}

export default CompanyLocation;
