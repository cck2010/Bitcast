import { Knex } from "knex";

export class MyLiveService {
    constructor(private knex: Knex) { }

    getMyLive = async () => {
        const results = await this.knex.raw(/*sql */ `
        select * from live
        left outer join users 
        on live.user_id = users.id
        `)
        return {
            success: true,
            data: {msg: "get my live products success", results}
        }
    }
}