import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("products", (table) => {
        table.increments();
        table.string("product_name").notNullable();
        table.integer("live_id").unsigned();
        table.foreign("live_id").references('live.id')

        table.integer("seller_id").unsigned();
        table.foreign("seller_id").references('users.id')

        table.integer("min_price").notNullable();
        table.integer("current_price");
        table.integer("buy_price").notNullable();
        table.integer("bid_increment").notNullable();

        table.integer("buyer_id").unsigned();
        table.foreign("buyer_id").references('users.id')

        table.integer("category_id").notNullable();
        table.string("product_image").notNullable();
        table.string('countdown_start_time');
        table.integer("duration").notNullable();
        table.boolean("is_ended").notNullable();

        table.timestamps(false, true);
        // created at and updated at
        table.string("created_by");
        table.string("updated_by");

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("products");
}

