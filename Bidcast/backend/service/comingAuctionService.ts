import { Knex } from "knex"

export class ComingAuctionService {
    constructor(private knex: Knex) { }

    getComingAuction = async () => {
        const results = await this.knex.raw(
            /*sql*/
            `select * from products 
            left outer join users on products.seller_id = users.id 
            limit 5;`
        )
        return {
            success: true,
            data: { msg: "get products success", results }
        }
    }
}