import { Entity, Property, ManyToOne, Unique } from '@mikro-orm/core';
import Company from 'company/company.entity';
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

  @ManyToOne(() => Company)
  company: Company;

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
