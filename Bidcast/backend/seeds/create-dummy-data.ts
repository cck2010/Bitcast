import { Knex } from "knex";
import { Chance } from "chance";
import { hashPassword } from "../hash";

const chance = new Chance();

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("follow_details").del();
    await knex("chat").del();
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
            { category: "原創設計" },
            { category: "電腦、平板與周邊" },
            { category: "居家、家具與園藝" },
            { category: "運動、戶外與休閒" },
            { category: "古董、藝術與礦石" },
            { category: "精品與服飾" },
        ])
        .returning("id");

    const imgArr = [
        "liveImage-1634805135838.jpeg",
        "liveImage-1635333470896.png",
        "liveImage-1635333674659.jpeg",
        "liveImage-1635427799318.png",
        "liveImage-1635427941411.png",
        "liveImage-1635475836637.png",
        "productImage-1634870092849.png",
        "productImage-1634875865005.jpeg",
        "productImage-1635333470915.png",
        "productImage-1635333674740.png",
        "productImage-1635427941421.png",
        "productImage-1635475836947.png",
        "productImage-1635475836981.jpeg",
    ];

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
                    profile_pic:
                        "360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg",
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
                    image: `${imgArr[Math.floor(Math.random() * imgArr.length)]
                        }`,
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
                product_image: `${imgArr[Math.floor(Math.random() * imgArr.length)]
                    }`,
                is_selected: isSelected,
                duration: 0,
                created_by: "knex seed",
                updated_by: "knex seed",
                description: chance.paragraph(),
            });
        }

        if (i === 0) {
            const userId2 = (
                await knex("users")
                    .insert({
                        username: "abc123",
                        status_id: statusId[0],
                        email: "abc@123.com",
                        password: await hashPassword("123Abc!!"),
                        phone_number: "23456789",
                        role_id: rolesId[0],
                        telegram_is_verified: false,
                        profile_pic:
                            "360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg",
                        created_by: "knex seed",
                        updated_by: "knex seed",
                        login_method_id: loginMethodsId[0],
                    })
                    .returning("id")
            )[0];

            const liveId2 = (
                await knex("live")
                    .insert({
                        user_id: userId2,
                        title: chance.sentence(),
                        image: `${imgArr[Math.floor(Math.random() * imgArr.length)]
                            }`,
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
            for (let i = 0; i < 10; i++) {
                let isSelected = false;
                if (i === 0) {
                    isSelected = true;
                }

                const price = Math.floor(Math.random() * 500);
                await knex("products").insert({
                    product_name: chance.word(),
                    live_id: liveId2,
                    seller_id: userId2,
                    min_price: price,
                    current_price: price,
                    buy_price: price * 10,
                    bid_increment: Math.floor(price / 10) + 1,
                    category_id:
                        categoryId[
                        Math.floor(Math.random() * categoryId.length)
                        ],
                    product_image: `${imgArr[Math.floor(Math.random() * imgArr.length)]
                        }`,
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
