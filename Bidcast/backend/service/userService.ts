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


export class UserService {
    constructor(private knex: Knex) { }

    register = async (
        username: string,
        email: string,
        password: string,
        phoneNumber: number,
    ): Promise<ResponseJson> => {
        if (!(username && email && password && phoneNumber)) {
            return {
                success: false,
                data: {
                    msg: "註冊失敗,請填入空白欄位",
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
                    msg: "請遵循所需的密碼格式",
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
                    msg: "請輸入正確的郵箱",
                    user: {},
                },
                error: new Error(
                    "Please input your correct email"
                ),
            };
        }
        if (phoneNumber.toString().length != 8) {
            return {
                success: false,
                data: {
                    msg: "請輸入正確的電話號碼",
                    user: {},
                },
                error: new Error(
                    "Please input your correct phone number"
                ),
            };

        }

        const hashedPassword = await hashPassword(password);
        const localLoginId = await this.knex("login_methods").select('id').where('login_method', 'local')
        const statusIdId = await this.knex('status').select('id').where('status', 'active')
        const roleIdId = await this.knex('roles').select('id').where('role_name', 'user')
        // inserted user
        const createUserResult /*  = result.rows */ =
            await this.knex("users")
                .insert({
                    username: username,
                    status_id: statusIdId[0].id,
                    email: email,
                    phone_number: phoneNumber,
                    password: hashedPassword,
                    role_id: roleIdId[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                    telegram_is_verified: false,
                    profile_pic:
                        "/backend/img/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg",
                    login_method_id: localLoginId[0].id,
                    created_by: username,
                    updated_by: username,
                })
                .returning("id");

        //    users is the new input db row
        const users = await this.knex("users")
            .select("*")
            .where("id", createUserResult[0]);

        // check repeat email  ,cannot login if repeat and delete db
        const checkRepeatEmail = await this.knex.raw(`
                        SELECT email,count(*) as count FROM users 
                        where email = '${email}' and  login_method_id = '${localLoginId[0].id}'
                        GROUP BY email
                        `);
        const emailCount = parseInt(checkRepeatEmail.rows[0].count);
        console.log("emailCount=", emailCount);

        if (emailCount != 1) {
            await this.knex("users")
                .del()
                .where("id", createUserResult[0]);
            return {
                success: false,
                data: {
                    msg: "重複的電子郵件",
                    user: {},
                },
                error: new Error("Duplicated email"),
            };
        }
        // check repeat username
        const checkRepeatusername = await this.knex.raw(`
                SELECT username,count(*) as count FROM users 
                where username = '${username}'
                GROUP BY username
                `);

        const usernameCount = parseInt(checkRepeatusername.rows[0].count);

        if (usernameCount != 1) {
            await this.knex("users")
                .del()
                .where("id", createUserResult[0]);
            return {
                success: false,
                data: {
                    msg: "用戶名重複，請重新選擇",
                    user: {
                    },
                },
                error: new Error("username repeated"),
            };
        }
        return {
            success: true,
            data: {
                msg: "註冊成功",
                user: {
                    id: users[0].id,
                    username: users[0].username,
                    status_id: users[0].status_id,
                    profile_pic: users[0].profile_pic,
                    email: users[0].email,
                    phone_number: users[0].phone_number,
                    role_id: users[0].role_id,
                    telegram_acct: users[0].telegram_acct,
                    telegram_is_verified: users[0].telegram_is_verified,
                    telegram_chat_id: users[0].telegram_chat_id,
                    login_method_id: users[0].login_method_id,
                    created_at: users[0].created_at,
                    updated_at: users[0].updated_at,
                },
            },
            error: new Error("signin success"),
        };

    };

    login = async (email: string, password: string): Promise<ResponseJson> => {
        if (!(email && password)) {
            return {
                success: false,
                data: {
                    msg: "請填入空白欄位",
                    user: {},
                },
                error: new Error("Please fill in the blank form"),
            };
        }
        const localLoginId = await this.knex("login_methods").select('id').where('login_method', 'local')
        const users = await this.knex("users")
            .select("*")
            .where({
                "email": email,
                "login_method_id": localLoginId[0].id,
            });

        if (users.length == 0) {
            // console.log(users.length);
            return {
                success: false,
                data: {
                    msg: "用戶不存在",
                    user: {},
                },
                error: new Error("User does not exsist"),
            };
        }

        if (!(await checkPassword(password, users[0].password))) {

            return {
                success: false,
                data: {
                    msg: "密碼錯誤",
                    user: {},
                },
                error: new Error("Wrong password"),
            };
        }

        return {
            data: {
                user: {
                    id: users[0].id,
                    username: users[0].username,
                    status_id: users[0].status_id,
                    profile_pic: users[0].profile_pic,
                    email: users[0].email,
                    phone_number: users[0].phone_number,
                    role_id: users[0].role_id,
                    telegram_acct: users[0].telegram_acct,
                    telegram_is_verified: users[0].telegram_is_verified,
                    telegram_chat_id: users[0].telegram_chat_id,
                    login_method_id: users[0].login_method_id,
                    created_at: users[0].created_at,
                    updated_at: users[0].updated_at,
                },

                msg: "成功登入",
            },
            success: true,
        };
    }




    getCurrentUser = async (id: number): Promise<ResponseJson> => {


        const users = await this.knex("users")
            .select()
            .where("id", id)


        return {
            success: true,
            data: {
                msg: "return user data successfully",
                user: {
                    id: users[0].id,
                    username: users[0].username,
                    status_id: users[0].status_id,
                    profile_pic: users[0].profile_pic,
                    email: users[0].email,
                    phone_number: users[0].phone_number,
                    role_id: users[0].role_id,
                    telegram_acct: users[0].telegram_acct,
                    telegram_is_verified: users[0].telegram_is_verified,
                    telegram_chat_id: users[0].telegram_chat_id,
                    login_method_id: users[0].login_method_id,
                    created_at: users[0].created_at,
                    updated_at: users[0].updated_at,
                },
            },
        } as ResponseJson;
    };

    FacebookLogin = async (email: string, username: string, picture: string): Promise<ResponseJson> => {


        const users = await this.knex("users")
            .select()
            .where("email", email)

        if (users.length == 0) {
            // insert
            const localLoginId = await this.knex("login_methods").select('id').where('login_method', 'local')
            const statusIdId = await this.knex('status').select('id').where('status', 'active')
            const roleIdId = await this.knex('roles').select('id').where('role_name', 'user')
            let hashedPassword = await hashPassword(
                (Math.random() + 1).toString(36)
            );
            const users /*  = result.rows */ =
                await this.knex("users")
                    .insert({
                        username: username,
                        status_id: statusIdId[0].id,
                        email: email,
                        phone_number: 11111111,
                        password: hashedPassword,
                        role_id: roleIdId[0].id,
                        created_at: new Date(),
                        updated_at: new Date(),
                        telegram_is_verified: false,
                        profile_pic:
                            "/backend/img/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg",
                        login_method_id: localLoginId[0].id,
                        created_by: username,
                        updated_by: username,
                    })
                    .returning(["id", 'status_id', 'email', 'phone_number', 'role_id', 'created_at', 'updated_at', 'telegram_is_verified', 'profile_pic',
                        'login_method_id', 'created_by', 'updated_by']);

            return {
                success: true,
                data: {
                    msg: "inserted facebook user",
                    user: {
                        id: users[0].id,
                        username: users[0].username,
                        status_id: users[0].status_id,
                        profile_pic: users[0].profile_pic,
                        email: users[0].email,
                        phone_number: users[0].phone_number,
                        role_id: users[0].role_id,
                        telegram_acct: users[0].telegram_acct,
                        telegram_is_verified: users[0].telegram_is_verified,
                        telegram_chat_id: users[0].telegram_chat_id,
                        login_method_id: users[0].login_method_id,
                        created_at: users[0].created_at,
                        updated_at: users[0].updated_at,
                    },
                },
            } as ResponseJson;

        } else {
            return {
                success: true,
                data: {
                    msg: "facebook user login",
                    user: {
                        id: users[0].id,
                        username: users[0].username,
                        status_id: users[0].status_id,
                        profile_pic: users[0].profile_pic,
                        email: users[0].email,
                        phone_number: users[0].phone_number,
                        role_id: users[0].role_id,
                        telegram_acct: users[0].telegram_acct,
                        telegram_is_verified: users[0].telegram_is_verified,
                        telegram_chat_id: users[0].telegram_chat_id,
                        login_method_id: users[0].login_method_id,
                        created_at: users[0].created_at,
                        updated_at: users[0].updated_at,
                    },
                },
            } as ResponseJson;
        }

    };
}
