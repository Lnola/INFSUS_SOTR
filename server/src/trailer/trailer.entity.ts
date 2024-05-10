import { Entity, Property } from '@mikro-orm/core';
import TransportVehicle from 'transport-vehicle/transport-vehicle';

@Entity({ tableName: 'trailer' })
class Trailer extends TransportVehicle {
  @Property()
  palletCapacity: number;

  @Property({ nullable: true })
  length: number;

  constructor(registration: string, productionYear: string, palletCapacity: number, length?: number) {
    super(registration, productionYear);
    this.palletCapacity = palletCapacity;
    this.length = length;
  }
}

export default Trailer;
