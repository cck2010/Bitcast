import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("live", (table) => {
        table.increments();
        table.integer("user_id").unsigned();
        table.foreign("user_id").references('users.id')
        table.string("title").notNullable();


        table.text("image").notNullable();

        table.string("starting_time").notNullable();
        table.integer("status_id").unsigned();
        table.foreign("status_id").references('status.id')
        table.integer("max_viewers").notNullable();
        table.integer("selected_product_id").unsigned();
        table.foreign("selected_product_id").references('products.id')
        table.integer("current_viewers");
        table.text("seller_link")

        table.text("buyer_link");
        table.boolean("is_live").notNullable();
        table.boolean('is_ended').notNullable();
        table.boolean("is_banned").notNullable();

        table.timestamps(false, true);
        // created at and updated at
        table.string("created_by");
        table.string("updated_by");

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("live");
}

