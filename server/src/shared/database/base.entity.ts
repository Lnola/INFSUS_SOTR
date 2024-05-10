import { PrimaryKey } from '@mikro-orm/core';

abstract class BaseEntity {
  @PrimaryKey()
  id: number;
}

export default BaseEntity;
