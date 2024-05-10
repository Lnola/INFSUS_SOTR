import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import CompanyLocation from 'company-location/company-location.entity';
import Order from 'order/order.entity';
import BaseEntity from 'shared/database/base.entity';

@Entity({ tableName: 'company' })
class Company extends BaseEntity {
  @Property({ length: 11 })
  @Unique()
  oib: string;

  @Property()
  name: string;

  // TODO: decide if it needs to be private and eager
  @OneToMany({
    entity: () => Order,
    mappedBy: (it: Order) => it.financer,
    orphanRemoval: true,
    eager: false,
  })
  _orders = new Collection<Order>(this);

  // TODO: decide if it needs to be private and eager
  @OneToMany({
    entity: () => CompanyLocation,
    mappedBy: (it: CompanyLocation) => it.company,
    orphanRemoval: true,
    eager: false,
  })
  _companyLocations = new Collection<CompanyLocation>(this);

  constructor(oib: string, name: string) {
    super();
    this.oib = oib;
    this.name = name;
  }
}

export default Company;
