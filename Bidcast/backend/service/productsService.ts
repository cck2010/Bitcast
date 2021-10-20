import { Knex } from "knex";
// import { ResponseJson } from '../response';

export class ProductsService {
    constructor(private knex: Knex) {}

    getCategories = async () => {
        try {
            const results = await this.knex.select("*").from("categories");
            // return console.log("results", results);
            return {
                success: true,
                data: { msg: "get categories success", results },
            };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                data: { msg: "service side get categories fail" },
                error: new Error("get categories fail"),
            };
        }
    };
    submitBid = async (liveInput: Object, productInput: [Object]) => {
        console.table(liveInput);
        console.table(productInput);
        try {
        } catch (error) {
            console.log(error);
        }
    };

    putBidIncrement = async (productId: number) => {
        return productId + 10;
    };

    startBid = async (productId: number, seconds: number) => {
        console.log(productId, seconds);

        return productId + 10;
    };

    selectProduct = async (productId: number) => {
        const liveId = (
            await this.knex("products").select("live_id").where("id", productId)
        )[0].live_id;

        await this.knex("products")
            .update("is_selected", false)
            .where("live_id", liveId);

        await this.knex("products")
            .update("is_selected", true)
            .where("id", productId);

        return;
    };
}
