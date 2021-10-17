import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("chat", (table) => {
        table.increments();
        table.integer("live_id").unsigned();
        table.foreign("live_id").references('live.id')
        table.text("message");

        table.integer("user_id").notNullable();
        table.foreign("user_id").references('user.id')
        table.timestamps(false, true);
        // created at and updated at


    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("chat");
}

