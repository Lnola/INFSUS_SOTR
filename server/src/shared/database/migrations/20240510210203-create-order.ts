import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'order';

export class CreateOrder extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createOrderTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id');
      table.string('serialNumber').notNullable().unique();
      table.decimal('transportPrice').notNullable();
      table.decimal('distance').notNullable();
      table.integer('truckId').notNullable();
      table.foreign('truckId').references('id').inTable('truck');
      table.integer('trailerId').notNullable();
      table.foreign('trailerId').references('id').inTable('trailer');
      table.integer('companyId').notNullable();
      table.foreign('companyId').references('id').inTable('company');
      table.integer('statusId').notNullable();
      table.foreign('statusId').references('id').inTable('order_status');
    });

    this.addSql(createOrderTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
