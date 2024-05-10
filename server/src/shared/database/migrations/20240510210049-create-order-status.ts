import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'order_status';

export class CreateOrderStatus extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createOrderStatusTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id');
      table.string('name').notNullable().unique();
    });

    this.addSql(createOrderStatusTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
