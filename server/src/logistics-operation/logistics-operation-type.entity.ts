import { Entity, Property, Unique } from '@mikro-orm/core';
import BaseEntity from 'shared/database/base.entity';

@Entity({ tableName: 'logistics_operation_type' })
class LogisticsOperationType extends BaseEntity {
  @Property()
  @Unique()
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

export default LogisticsOperationType;
