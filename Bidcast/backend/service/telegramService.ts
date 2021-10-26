import { Knex } from "knex";

export class TelegramService {
    constructor(private knex: Knex) { }

    checkVerified = async (
        // tgUsername:string,
        tgGetEmail:string
        ) => {
        console.log("tgGetEmail", tgGetEmail);
        const results = await this.knex("users").select("telegram_acct","username","telegram_is_verified").where("email",tgGetEmail)
        return {
            success: true,
            data: { msg: "TG get user data ", results },
        }
    }
    tgAllowVerified = async (
        tgGetEmail:string,
        username:string,
    )=>{
        const results = await this.knex("users").update({
            telegram_is_verified:true,
            updated_at:new Date(),
            updated_by:username
        }).where("email",tgGetEmail).returning("*")
        return {
            success: true,
            data: { msg: "Telegram account verified ", results },
            
        }
        
    }
}