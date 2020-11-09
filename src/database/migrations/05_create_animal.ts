import knex from 'knex';

export async function up (knex: knex){
    return knex.schema.createTable('animal', table => {
        table.increments('id').primary();
        table.integer('breedID').notNullable().references('id').inTable('breed').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('userID').notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
        table.string('description', 64).notNullable();
        table.string('imgURL', 255).notNullable();
        table.string('qrCode', 255).notNullable();
    
    });
}

export async function down (knex: knex){
    return knex.schema.dropTable('animal');
}