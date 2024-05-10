import { Entity, Property } from '@mikro-orm/core';
import TransportVehicle from 'transport-vehicle/transport-vehicle';

@Entity({ tableName: 'truck' })
class Truck extends TransportVehicle {
  @Property()
  tankCapacity: number;

  @Property({ nullable: true })
  horsepower: number;

  constructor(registration: string, productionYear: string, tankCapacity: number, horsepower?: number) {
    super(registration, productionYear);
    this.tankCapacity = tankCapacity;
    this.horsepower = horsepower;
  }
}

export default Truck;
