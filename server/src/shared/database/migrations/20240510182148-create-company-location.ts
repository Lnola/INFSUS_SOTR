import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'company_location';

export class CreateCompanyLocation extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createCompanyLocationTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id');
      table.string('street').notNullable();
      table.string('zip').notNullable();
      table.string('city').notNullable();
      table.string('country').notNullable();
      table.string('name').notNullable().unique();
      table.integer('company_id').notNullable();
      table.foreign('company_id').references('id').inTable('company');
    });

    this.addSql(createCompanyLocationTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
