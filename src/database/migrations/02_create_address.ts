import knex from 'knex';

export async function up (knex: knex){
    return knex.schema.createTable('address', table => {
        table.increments('id').primary();
        table.string('publicPlace', 32).notNullable();
        table.bigInteger('houseNumber').notNullable();
        table.string('complement', 64).notNullable();
        table.string('postalCode', 32).notNullable();
        table.string('neighborhood', 32).notNullable();
        table.string('city', 32).notNullable();
        table.string('uf', 32).notNullable();
        table.string('country', 32).notNullable();
    })
}

export async function down (knex: knex){
    return knex.schema.dropTable('address');
}