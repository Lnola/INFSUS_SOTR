import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import DriverOrder from 'driver-order/driver-order.entity';
import BaseEntity from 'shared/database/base.entity';

@Entity({ tableName: 'driver' })
class Driver extends BaseEntity {
  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  @Unique()
  contactNumber: string;

  @Property()
  employmentStartDate: Date;

  @Property({ nullable: true })
  employmentEndDate?: Date;

  // TODO: decide if it needs to be private and eager
  @OneToMany({
    entity: () => DriverOrder,
    mappedBy: (it: DriverOrder) => it.driver,
    orphanRemoval: true,
    eager: false,
  })
  _driverOrders = new Collection<DriverOrder>(this);

  constructor(
    firstName: string,
    lastName: string,
    contactNumber: string,
    employmentStartDate: Date,
    employmentEndDate?: Date,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.contactNumber = contactNumber;
    this.employmentStartDate = employmentStartDate;
    this.employmentEndDate = employmentEndDate;
  }
}

export default Driver;
