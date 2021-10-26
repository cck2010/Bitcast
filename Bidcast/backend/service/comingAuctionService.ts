import { Knex } from "knex"

export class ComingAuctionService {
    constructor(private knex: Knex) { }

    getComingAuction = async () => {
        const results = await this.knex.raw(
            /*sql*/
            `select live.id, live.title, live.image, live.starting_time, live.description, username from live
            left outer join users on live.user_id = users.id 
            order by live.starting_time asc
            limit 10
            `
        )
        return {
            success: true,
            data: { msg: "get products success", results }
        }
    }

    getBroadcastingProduct = async () => {
        const results = await this.knex.raw(
            /*sql*/
            `select * from live
            right outer join products on products.live_id = live.id
            left outer join users on live.user_id = users.id
            where products.is_selected = true
            limit 10`
        )
        return {
            success: true,
            data: { msg: "get broadcasting products success", results }
        }
    }

    getProductDetails = async () => {
        const results = await this.knex.raw(
            /*sql*/
            `
            select * from live
            order by live.starting_time asc
            limit 10
            `
        )
        return {
            success: true,
            data: { msg: "get product details success", results }
        }
    }
}