import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'driver';

export class CreateDriver extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createDriverTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id');
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('contact_number').notNullable().unique();
      table.date('employment_start_date').notNullable();
      table.date('employment_end_date').nullable();
    });

    this.addSql(createDriverTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
