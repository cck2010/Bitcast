import { Knex } from "knex";


export class CategoriesService {
    constructor(private knex: Knex) {}
    
    categoriesFilter = async (categoryId: number) =>{
        const results = await this.knex.raw(
            /*sql */
            `
            select 
            products.id, 
            products.product_name, 
            products.buy_price, 
            products.min_price, 
            products.product_image, 
            products.description, 
            users.username,
            categories.category
            from products
            left outer join categories 
            on products.category_id = categories.id
            left outer join users on products.seller_id = users.id
            where categories.id=${categoryId}
            `
        )
        return {
            success: true,
            data: { msg: "searching products result here", results },
        }
    }
}