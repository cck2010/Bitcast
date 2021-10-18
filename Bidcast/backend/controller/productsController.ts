import {Request, Response} from 'express';
import { ProductsService } from '../service/productsService';

export class ProductsController {
    constructor(private productsService: ProductsService){}

    getCategories = async (req: Request, res: Response) => {
        try {
            const result = await this.productsService.getCategories();
            res.json(result);
        } catch (error) {
            res.json({
                success:false,
                data:{msg:"controller get categories fail"},
                error: new Error("get categories fail"),
            })
        }
    }



}