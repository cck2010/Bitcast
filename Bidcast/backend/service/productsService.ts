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

    searchProductResults = async (searchKeywords: string)=> {
        const results = await this.knex.raw(/*sql*/ `
        select * from products where product_name ilike '%${searchKeywords}%';
        `)
        return {
            success: true,
            data: { msg: "searching products result here", results }
        }
    }
}
