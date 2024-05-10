import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'driver_order';

export class CreateDriverOrder extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createDriverOrderTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id');
      table.integer('driver_id').notNullable();
      table.foreign('driver_id').references('id').inTable('driver');
      table.integer('order_id').notNullable();
      table.foreign('order_id').references('id').inTable('order');
    });

    this.addSql(createDriverOrderTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
