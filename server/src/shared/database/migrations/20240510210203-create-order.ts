import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'order';

export class CreateOrder extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createOrderTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id');
      table.string('serial_number').notNullable().unique();
      table.decimal('transport_price').notNullable();
      table.decimal('distance').notNullable();
      table.integer('truck_id').notNullable();
      table.foreign('truck_id').references('id').inTable('truck').onDelete('CASCADE');
      table.integer('trailer_id').notNullable();
      table.foreign('trailer_id').references('id').inTable('trailer').onDelete('CASCADE');
      table.integer('company_id').notNullable();
      table.foreign('company_id').references('id').inTable('company').onDelete('CASCADE');
      table.integer('status_id').notNullable();
      table.foreign('status_id').references('id').inTable('order_status').onDelete('CASCADE');
    });

    this.addSql(createOrderTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
