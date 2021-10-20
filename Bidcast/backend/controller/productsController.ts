import { Request, Response } from 'express';
import { ProductsService } from '../service/productsService';

export class ProductsController {
    constructor(private productsService: ProductsService) { }

    getCategories = async (req: Request, res: Response) => {
        try {
            const result = await this.productsService.getCategories();
            console.log("result", result);
            res.json(result);
        } catch (error) {
            res.json({
                success: false,
                data: { msg: "controller get categories fail" },
                error: new Error("get categories fail"),
            })
        }
    }
    submitBidLiveInfo = async (req: Request, res: Response) => {
        try {
            // console.log("req.body", req.body);
            const liveImage: string | undefined = req.file?.filename;
            // console.log("liveImage", liveImage);
            // console.log("req.body", req.body);
            // console.table(req.body);
            const { liveTitle, description, startDate } = req.body
            // console.log("startDate >>>>", startDate);
            const ms = Date.parse(startDate)
            // console.log("ms >>>>", ms);
            const startDateFormat = new Date(ms + 28800000)
            // console.log("startDateFormat >>>", startDateFormat);

            const result = await this.productsService.submitBidLiveInfo(liveTitle, description, startDateFormat, liveImage);
            console.log("submitted live result (controller side)", result);
            res.json(result)

        } catch (error) {
            res.json({
                success: false,
                data: { msg: "controller submit live Input fail" },
                error: new Error("controller submit live Input fail"),
            })
        }
    }
    submitProductInfo = async (req: Request, res: Response) => {
        try {
            const productImage:any= req.file?.filename;
            const {name, minimumBid,eachBidAmount,buyPrice,categoryId,description,liveId} = req.body

            const result = await this.productsService.submitProductInfo(
                name,
                productImage,
                parseInt(minimumBid),
                parseInt(eachBidAmount),
                parseInt(buyPrice),
                parseInt(categoryId),
                parseInt(liveId),
                description,
                )
            console.log("result", result);
            res.json(result)

        } catch (error) {
            res.json({
                success: false,
                data: { msg: "controller submit product fail" },
                error: new Error("controller submit product fail"),
            })
        }
    }   

}