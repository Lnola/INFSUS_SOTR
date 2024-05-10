import { Entity, Property, Unique } from '@mikro-orm/core';
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
