import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'logistics_operation_type';

export class CreateLogisticsOperationType extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createLogisticsOperationTypeTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id');
      table.string('name').notNullable().unique();
    });

    this.addSql(createLogisticsOperationTypeTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
