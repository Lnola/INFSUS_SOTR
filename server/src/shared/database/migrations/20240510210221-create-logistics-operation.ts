import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'logistics_operation';

export class CreateLogisticsOperation extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createLogisticsOperationTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id');
      table.timestamp('date').notNullable();
      table.boolean('isCompleted').notNullable();
      table.text('note');
      table.integer('companyLocationId').notNullable();
      table.foreign('companyLocationId').references('id').inTable('company_location');
      table.integer('typeId').notNullable();
      table.foreign('typeId').references('id').inTable('logistics_operation_type');
      table.integer('orderId').notNullable();
      table.foreign('orderId').references('id').inTable('order');
    });

    this.addSql(createLogisticsOperationTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
