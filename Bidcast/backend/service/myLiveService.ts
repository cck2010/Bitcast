import { Knex } from "knex";

export class MyLiveService {
    constructor(private knex: Knex) { }

    getMyLive = async () => {
        const results = await this.knex.raw(/*sql */ `
        select live.id, 
        live.user_id, 
        live.title, 
        live.image, 
        live.starting_time, 
        live.max_viewers, 
        live.seller_link, 
        live.is_ended 
        from live
        `)
        return {
            success: true,
            data: { msg: "get my live products success", results }
        }
    }

    getMyBidHistory = async () => {
        const results = await this.knex.raw(
            /*sql */
            `
            select * from products
            left outer join users on products.seller_id = users.id
            `
        )
        return {
            success: true,
            data: { msg: "get my bid history success", results }
        }
    }

    getMyLiveProducts = async () => {
        const results = await this.knex.raw(
            /*sql*/
            `
            select * from products
            left outer join users on products.seller_id = users.id
            left outer join live on products.live_id = live.id
            `
        )
        return {
            success: true,
            data: { msg: "get my live products success", results }
        }
    }

    changeLiveStatus = async (liveId: number) => {
        const results = await this.knex("live")
            .where("id", liveId)
            .update({
                "is_ended": true,
                "is_live": false
            }, ['id', 'is_ended', 'is_live'])
        return {
            success: true,
            data: { msg: "update live status success", results }
        }
    }
}