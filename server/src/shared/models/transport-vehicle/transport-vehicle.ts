import { Property, Unique } from '@mikro-orm/core';
import BaseEntity from 'shared/database/base.entity';

class TransportVehicle extends BaseEntity {
  @Property()
  @Unique()
  registration: string;

  @Property({ nullable: true, length: 4 })
  productionYear: string;

  constructor(registration: string, productionYear?: string) {
    super();
    this.registration = registration;
    this.productionYear = productionYear;
  }
}

export default TransportVehicle;
