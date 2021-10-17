import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.increments();
        table.string("username").notNullable();
        table.string("password").notNullable();
        table.string("email").notNullable();
        table.string("profile_pic");
        table.integer("phone_number");
        table.integer("role_id").notNullable();
        table.integer("status_id");
        table.string("telegram_acct");
        table.boolean("telegram_is_verified").notNullable();
        table.integer("login_method_id");
        table.timestamps(false, true);
        // created at and updated at
        table.string("created_by");
        table.string("updated_by");

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users");
}

