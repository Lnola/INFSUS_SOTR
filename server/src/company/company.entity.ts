import { Entity, Property, Unique } from '@mikro-orm/core';
import BaseEntity from 'shared/database/base.entity';

@Entity({ tableName: 'company' })
class Company extends BaseEntity {
  @Property({ length: 11 })
  @Unique()
  oib: string;

  @Property()
  name: string;

  constructor(oib: string, name: string) {
    super();
    this.oib = oib;
    this.name = name;
  }
}

export default Company;
