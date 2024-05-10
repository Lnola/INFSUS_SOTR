import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'driver_order';

export class CreateDriverOrder extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createDriverOrderTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id');
      table.integer('driverId').notNullable();
      table.foreign('driverId').references('id').inTable('driver');
      table.integer('orderId').notNullable();
      table.foreign('orderId').references('id').inTable('order');
    });

    this.addSql(createDriverOrderTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
