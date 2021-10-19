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
    submitBid = async (req: Request, res:Response) => {
        try {
            // console.log("req.body", req.body);
            
            const {liveInput,productInput} = req.body
            console.log("productInput", productInput);
            console.log("liveInput", liveInput);
            
            const result = await this.productsService.submitBid(liveInput,productInput);
            res.json(result)
        } catch (error) {
            res.json({
                success:false,
                data:{msg:"controller submitBid fail"},
                error: new Error("controller submitBid fail"),
            })
        }
    }


}