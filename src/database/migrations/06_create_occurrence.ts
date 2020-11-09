import knex from 'knex';

export async function up (knex: knex){
    return knex.schema.createTable('occurrence', table => {
        table.increments('id').primary();
        table.integer('animalID').notNullable().references('id').inTable('animal').onUpdate('CASCADE').onDelete('CASCADE');
        table.string('startDate', 32).notNullable();
        table.string('endDate', 32).notNullable();
        table.string('description', 64).notNullable();
    });
}

export async function down (knex: knex){
    return knex.schema.dropTable('occurrence');
}