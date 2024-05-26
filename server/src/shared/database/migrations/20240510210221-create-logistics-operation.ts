import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'logistics_operation';

export class CreateLogisticsOperation extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createLogisticsOperationTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id');
      table.timestamp('date').notNullable();
      table.boolean('is_completed').notNullable();
      table.text('note');
      table.integer('company_location_id').notNullable();
      table.foreign('company_location_id').references('id').inTable('company_location').onDelete('CASCADE');
      table.integer('type_id').notNullable();
      table.foreign('type_id').references('id').inTable('logistics_operation_type').onDelete('CASCADE');
      table.integer('order_id').notNullable();
      table.foreign('order_id').references('id').inTable('order').onDelete('CASCADE');
    });

    this.addSql(createLogisticsOperationTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
