import knex from 'knex';

export async function up (knex: knex){
    return knex.schema.createTable('animal', table => {
        table.increments('id').primary();
        table.string('petName', 32).notNullable();
        table.string('breeds', 32).notNullable();   
        table.string('description', 64).notNullable();
        table.string('imgURL', 255).notNullable();
        table.string('qrCode', 255);

        table.integer('userID').notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    
    });
}

export async function down (knex: knex){
    return knex.schema.dropTable('animal');
}