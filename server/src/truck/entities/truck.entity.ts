import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import Order from 'order/entities/order.entity';
import TransportVehicle from 'shared/models/transport-vehicle/transport-vehicle';

@Entity({ tableName: 'truck' })
class Truck extends TransportVehicle {
  @Property()
  tankCapacity: number;

  @Property({ nullable: true })
  horsepower: number;

  // TODO: decide if it needs to be private and eager
  @OneToMany({
    entity: () => Order,
    mappedBy: (it: Order) => it.truck,
    orphanRemoval: true,
    eager: false,
  })
  _orders = new Collection<Order>(this);

  constructor(registration: string, productionYear: string, tankCapacity: number, horsepower?: number) {
    super(registration, productionYear);
    this.tankCapacity = tankCapacity;
    this.horsepower = horsepower;
  }
}

export default Truck;
