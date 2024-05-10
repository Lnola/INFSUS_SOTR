import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import Order from 'order/entities/order.entity';
import TransportVehicle from 'shared/models/transport-vehicle/transport-vehicle';

@Entity({ tableName: 'trailer' })
class Trailer extends TransportVehicle {
  @Property()
  palletCapacity: number;

  @Property({ nullable: true })
  length: number;

  // TODO: decide if it needs to be private and eager
  @OneToMany({
    entity: () => Order,
    mappedBy: (it: Order) => it.trailer,
    orphanRemoval: true,
    eager: false,
  })
  _orders = new Collection<Order>(this);

  constructor(registration: string, productionYear: string, palletCapacity: number, length?: number) {
    super(registration, productionYear);
    this.palletCapacity = palletCapacity;
    this.length = length;
  }
}

export default Trailer;
