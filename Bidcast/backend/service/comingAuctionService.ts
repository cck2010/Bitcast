import { Knex } from "knex"

export class ComingAuctionService {
    constructor(private knex: Knex) { }

    getComingAuction = async () => {
        const results = await this.knex.raw(
            /*sql*/
            `select * from live 
            left outer join users on live.user_id = users.id 
            limit 6;`
        )
        return {
            success: true,
            data: { msg: "get products success", results }
        }
    }
}