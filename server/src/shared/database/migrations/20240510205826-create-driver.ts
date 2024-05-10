import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'driver';

export class CreateDriver extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createDriverTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id');
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('contactNumber').notNullable().unique();
      table.date('employmentStartDate').notNullable();
      table.date('employmentEndDate').nullable();
    });

    this.addSql(createDriverTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
