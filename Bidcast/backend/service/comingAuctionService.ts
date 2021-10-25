import { Knex } from "knex"

export class ComingAuctionService {
    constructor(private knex: Knex) { }

    getComingAuction = async () => {
        const results = await this.knex.raw(
            /*sql*/
            `select * from products
            left outer join live on products.live_id = live.id
            left outer join users on live.user_id = users.id
            limit 10`
        )
        return {
            success: true,
            data: { msg: "get products success", results }
        }
    }

    getBroadcastingProduct = async () => {
        const results = await this.knex.raw(
            /*sql*/
            `select * from products
            left outer join live on products.live_id = live.id
            left outer join users on live.user_id = users.id
            where live.is_live is true
            limit 10`
        )
        return {
            success: true,
            data: {msg: "get broadcasting products success", results}
        }
    }
}