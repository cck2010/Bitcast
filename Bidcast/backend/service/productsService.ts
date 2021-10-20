import { Knex } from 'knex';
// import { ResponseJson } from '../response';

export class ProductsService {
    constructor(private knex: Knex) { }

    getCategories = async () => {
        const results = await this.knex.select("*").from("categories");
        // return console.log("results", results);
        return {
            success: true,
            data: { msg: "get categories success", results },
        };

    }
    submitBidLiveInfo = async (
        liveTitle: string,
        description: string,
        startDate: Date | string,
        liveImage: string | undefined) => {

        console.log("liveImage", liveImage);
        console.log("startDate", startDate);
        console.log("liveIntro", description);
        console.log("liveTitle", liveTitle);

        const res = await this.knex("live").insert({
            user_id: 1,
            title: liveTitle,
            image: liveImage,
            starting_time: startDate,
            status_id: 1,
            max_viewers: 0,
            current_viewers: 0,
            seller_link: "abc",
            buyer_link: "123",
            is_live: false,
            is_ended: false,
            is_banned: false,
            created_at: new Date(),
            updated_at: new Date(),
            description: description,
        }).returning("*");
        // const resultData = await this.knex("live").select("*")
        // console.log("resultData", resultData);
        console.log("Submitted live_id :", res);
        return {
            success: true,
            data: { msg: "submit liveInfo success", res },
        };
    }
    submitProductInfo = async (
        name: string,
        productImage: string,
        minimumBid: number,
        eachBidAmount: number,
        buyPrice: number,
        categoryId: number,
        liveId: number,
        description: string,
        ) => {
            
        // console.log(name,productImage, minimumBid,eachBidAmount,buyPrice,categoryId,description,liveId);
        const res = await this.knex("products").insert({
            product_name: name,
            live_id: liveId,
            seller_id: 1,
            min_price: minimumBid,
            current_price: minimumBid,
            buy_price: buyPrice,
            bid_increment: eachBidAmount,
            category_id: categoryId,
            product_image: productImage,
            is_selected: false,
            duration: 0,
            is_ended: false,
            created_by: "test",
            updated_by: "test",
            created_at: new Date(),
            updated_at: new Date(),
            description: description,
        }).returning("*");

        console.log("Submitted products :", res);
        return {
            success: true,
            data: { msg: "submit product success", res },
        };
    }
}