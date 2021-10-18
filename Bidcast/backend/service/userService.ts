import { Knex } from "knex";
import { hashPassword, checkPassword } from "../hash";
import PasswordValidator from "password-validator";
import { ResponseJson } from "../response";
import validator from "email-validator"
const schema = new PasswordValidator();
schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have at least 1 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .has()
    .symbols(); //Must have symbols

function getRandomInt(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export class UserService {
    constructor(private knex: Knex) { }

    register = async (
        alias: string,
        email: string,
        password: string
    ): Promise<ResponseJson> => {
        // ("users").groupBy('alias', 'count').having('count', '>', 1);

        if (!alias || !email || !password) {
            return {
                success: false,
                data: {
                    msg: "Please fill in the blank form",
                    user: {},
                },
                error: new Error("Please fill in the blank form"),
            };

        }

        // check black input value
        if (!schema.validate(password)) {

            return {
                success: false,
                data: {
                    msg: "Plese follow the required password format",
                    user: {},
                },
                error: new Error(
                    "Plese follow the required password format"
                ),
            };
        }
        if (!validator.validate(email)) {
            return {
                success: false,
                data: {
                    msg: "Please input your correct email",
                    user: {},
                },
                error: new Error(
                    "Please input your correct email"
                ),
            };
        }

        const hashedPassword = await hashPassword(password);
        // inserted user
        const createUserResult /*  = result.rows */ = await this.knex("users")
            .insert({
                alias: alias,
                email: email,
                role: 1,
                password: hashedPassword,
                created_at: new Date(),
                updated_at: new Date(),
                number_tag: getRandomInt(1, 9999),
                profile_pic:
                    "/assets/img/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg",
            })
            .returning("id");
        await this.knex("achievement").insert({
            user_id: createUserResult[0],
            as1: false,
            as2: false,
            as3: false,
            ah1: false,
            ah2: false,
            ah3: false,
        });

        //    users is the new input db row
        const users = await this.knex("users")
            .select("*")
            .where("id", createUserResult[0]);
        // console.log("createUserResult = ", createUserResult);
        // check repeat email  ,cannot login if repeat and delete db
        const checkRepeatEmail = await this.knex.raw(`
                        SELECT email,count(*) as count FROM users 
                        where email = '${email}'
                        GROUP BY email
                        `);
        const emailCount = parseInt(checkRepeatEmail.rows[0].count);
        console.log("emailCount=", emailCount);

        if (emailCount == 1) {
            // check repeat alias
            const checkRepeatTable = await this.knex.raw(`
                SELECT alias,count(*) as count FROM users 
                where alias = '${alias}'
                GROUP BY alias
                `);
            // console.log("checkRepeatTable=", checkRepeatTable);
            const count = parseInt(checkRepeatTable.rows[0].count);
            // console.log(count);
            // count+1
            if (count > 1) {
                // console.log("count = ", count);

                // table,table then no need ',' to select above table
                const getBlankRandomNum = await this.knex
                    .raw(`WITH number_range_table as(
                            SELECT ones.n + 10*tens.n + 100*hundreds.n + 1000*thousands.n as userid
                            FROM (VALUES(0),(1),(2),(3),(4),(5),(6),(7),(8),(9)) ones(n),
                                 (VALUES(0),(1),(2),(3),(4),(5),(6),(7),(8),(9)) tens(n),
                                 (VALUES(0),(1),(2),(3),(4),(5),(6),(7),(8),(9)) hundreds(n),
                                 (VALUES(0),(1),(2),(3),(4),(5),(6),(7),(8),(9)) thousands(n)
                                 ORDER BY 1),                                
                         filter_users as (
                             select number_tag from users where alias = '${users[0].alias}'
                         )
                         
                         select userid from number_range_table where userid not in (select number_tag from filter_users) order by random() limit 1;
                         
                         `);
                // console.log(
                //     "exclusive random number=",
                //     getBlankRandomNum.rows[0].userid
                // );
                await this.knex.raw(
                    `UPDATE users SET number_tag = '${getBlankRandomNum.rows[0].userid}' WHERE email = '${users[0].email}'`
                );

                return {
                    success: true,
                    data: {
                        msg: "number_tag is repeated and randomed",
                        user: {
                            id: users[0].id,
                            alias: users[0].alias,
                            email: users[0].email,
                            number_tag:
                                getBlankRandomNum.rows[0].userid,
                            created_at: users[0].created_at,
                            updated_at: users[0].updated_at,
                        },
                    },
                    error: new Error("signup with repeated alias"),
                };
            } else {
                return {
                    success: true,
                    data: {
                        msg: "signup with not repeated alias",
                        user: {
                            id: users[0].id,
                            alias: users[0].alias,
                            email: users[0].email,
                            number_tag: users[0].number_tag,
                            created_at: users[0].created_at,
                            updated_at: users[0].updated_at,
                        },
                    },
                    error: new Error("signup with not repeated alias"),
                };
            }

            // if (emailCount == 1)
        } else {
            // console.log("emailcount>1");

            await this.knex("achievement")
                .del()
                .where({ user_id: createUserResult[0] });
            await this.knex("users")
                .del()
                .where("id", createUserResult[0]);
            return {
                success: false,
                data: {
                    msg: "Duplicated email",
                    user: {},
                },
                error: new Error("Duplicated email"),
            };
        }

        // if (schema.validate(password)) {

        // if (alias && email && password)

    };

    login = async (email: string, password: string): Promise<ResponseJson> => {
        if (email && password) {
            const users = await this.knex("users")
                .select("*")
                .where("email", email);

            if (users.length == 0) {
                // console.log(users.length);
                return {
                    success: false,
                    data: {
                        msg: "User does not exsist",
                        user: {},
                    },
                    error: new Error("User does not exsist"),
                };
            }

            else if (!(await checkPassword(password, users[0].password))) {
                return {
                    success: false,
                    data: {
                        msg: "Wrong password",
                        user: {},
                    },
                    error: new Error("Wrong password"),
                };
            } else {
                return {
                    data: {
                        user: {
                            id: users[0].id,
                            alias: users[0].alias,
                            email: users[0].email,
                            number_tag: users[0].number_tag,
                            created_at: users[0].created_at,
                            updated_at: users[0].updated_at,
                        },

                        msg: "return user data successfully",
                    },
                    success: true,
                };
            }
        } else {
            return {
                success: false,
                data: {
                    msg: "Please fill in the blank form",
                    user: {},
                },
                error: new Error("Please fill in the blank form"),
            };
        }
    };


    getCurrentUser = async (
        username: string,
        id: number

    ): Promise<ResponseJson> => {
        interface user {
            name: string;
            age: number;
        }

        const user = await this.knex("users")
            .select()
            .where("id", id)


        return {
            success: true,
            data: {
                msg: "return user data successfully",
                user: {
                    id: user[0].id,
                    email: user[0].email,
                    profilePic: user[0].profile_pic,


                },
            },
        };
    };


}
