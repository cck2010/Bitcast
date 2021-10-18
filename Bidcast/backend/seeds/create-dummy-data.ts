import { Knex } from "knex";
import { Chance } from "chance";
import { hashPassword } from "../hash";

const chance = new Chance();

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
    await knex("categories").del();
    await knex("login_methods").del();
    await knex("status").del();
    await knex("roles").del();

    // Inserts seed entries
    const rolesId = await knex("roles")
        .insert([{ role_name: "user" }, { role_name: "admin" }])
        .returning("id");
    const statusId = await knex("status")
        .insert([{ status: "active" }, { status: "inactive" }])
        .returning("id");
    const loginMethodsId = await knex("login_methods")
        .insert([
            { login_method: "local" },
            { login_method: "google" },
            { login_method: "twitter" },
            { login_method: "facebook" },
        ])
        .returning("id");
    await knex("categories")
        .insert([
            { category: "food" },
            { category: "cloths" },
            { category: "games" },
            { category: "shoes" },
        ])
        .returning("id");

    for (let i = 0; i < 10; i++) {
        await knex("users").insert({
            username: chance.name(),
            status_id: statusId[Math.floor(Math.random() * statusId.length)],
            email: chance.email(),
            password: await hashPassword("123"),
            phone_number: chance.phone(),
            role_id: rolesId[Math.floor(Math.random() * rolesId.length)],
            telegram_is_verified: false,
            created_by: "knex seed",
            updated_by: "knex seed",
            login_method_id:
                loginMethodsId[
                    Math.floor(Math.random() * loginMethodsId.length)
                ],
        });
    }
}
