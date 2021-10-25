import { Knex } from "knex";
import { Chance } from "chance";
import { hashPassword } from "../hash";

const chance = new Chance();

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("products").del();
    await knex("live").del();
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
    const categoryId = await knex("categories")
        .insert([
            { category: "food" },
            { category: "cloths" },
            { category: "games" },
            { category: "shoes" },
        ])
        .returning("id");

    for (let i = 0; i < 10; i++) {
        const userId = (
            await knex("users")
                .insert({
                    username: chance.name(),
                    status_id:
                        statusId[Math.floor(Math.random() * statusId.length)],
                    email: chance.email(),
                    password: await hashPassword("123"),
                    phone_number: chance.phone(),
                    role_id:
                        rolesId[Math.floor(Math.random() * rolesId.length)],
                    telegram_is_verified: false,
                    created_by: "knex seed",
                    updated_by: "knex seed",
                    login_method_id:
                        loginMethodsId[
                            Math.floor(Math.random() * loginMethodsId.length)
                        ],
                })
                .returning("id")
        )[0];

        const liveId = (
            await knex("live")
                .insert({
                    user_id: userId,
                    title: chance.sentence(),
                    image: `https://picsum.photos/200/300?random=${Math.floor(
                        Math.random() * 100
                    )}`,
                    starting_time: chance.date({ year: 2021 }),
                    status_id:
                        statusId[Math.floor(Math.random() * statusId.length)],
                    max_viewers: Math.floor(Math.random() * 1000) + 500,
                    current_viewers: 0,
                    seller_link: chance.fbid(),
                    buyer_link: chance.fbid(),
                    is_live: true,
                    is_ended: false,
                    is_banned: false,
                    description: chance.paragraph(),
                })
                .returning("id")
        )[0];

        for (let i = 0; i < 5; i++) {
            let isSelected = false;
            if (i === 0) {
                isSelected = true;
            }

            const price = Math.floor(Math.random() * 500);
            await knex("products").insert({
                product_name: chance.word(),
                live_id: liveId,
                seller_id: userId,
                min_price: price,
                current_price: price,
                buy_price: price * 10,
                bid_increment: Math.floor(price / 10) + 1,
                category_id:
                    categoryId[Math.floor(Math.random() * categoryId.length)],
                product_image: `https://picsum.photos/200/300?random=${Math.floor(
                    Math.random() * 100
                )}`,
                is_selected: isSelected,
                duration: 0,
                created_by: "knex seed",
                updated_by: "knex seed",
                description: chance.paragraph(),
            });
        }

        if (i === 0) {
            const liveId2 = (
                await knex("live")
                    .insert({
                        user_id: userId,
                        title: chance.sentence(),
                        image: `https://picsum.photos/200/300?random=${Math.floor(
                            Math.random() * 100
                        )}`,
                        starting_time: chance.date({ year: 2021 }),
                        status_id:
                            statusId[
                                Math.floor(Math.random() * statusId.length)
                            ],
                        max_viewers: Math.floor(Math.random() * 1000) + 500,
                        current_viewers: 0,
                        seller_link: 123,
                        buyer_link: "abc",
                        is_live: true,
                        is_ended: false,
                        is_banned: false,
                        description: chance.paragraph(),
                    })
                    .returning("id")
            )[0];
            for (let i = 0; i < 100; i++) {
                let isSelected = false;
                if (i === 0) {
                    isSelected = true;
                }

                const price = Math.floor(Math.random() * 500);
                await knex("products").insert({
                    product_name: chance.word(),
                    live_id: liveId2,
                    seller_id: userId,
                    min_price: price,
                    current_price: price,
                    buy_price: price * 10,
                    bid_increment: Math.floor(price / 10) + 1,
                    category_id:
                        categoryId[
                            Math.floor(Math.random() * categoryId.length)
                        ],
                    product_image: `https://picsum.photos/200/300?random=${Math.floor(
                        Math.random() * 100
                    )}`,
                    is_selected: isSelected,
                    duration: 0,
                    created_by: "knex seed",
                    updated_by: "knex seed",
                    description: chance.paragraph(),
                });
            }
        }
    }
}
