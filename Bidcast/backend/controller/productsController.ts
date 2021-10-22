import { Request, Response } from "express";
import { ProductsService } from "../service/productsService";

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
            });
        }
    };
    submitBidLiveInfo = async (req: Request, res: Response) => {
        try {
            // console.log("req.body", req.body);
            const liveImage: string | undefined = req.file?.filename;
            // console.log("liveImage", liveImage);
            // console.log("req.body", req.body);
            // console.table(req.body);
            const { liveTitle, description, startDate,userId,sellerLink,buyerLink } = req.body;
            console.log("liveTitle", liveTitle);
            console.log("buyerLink", buyerLink);
            console.log("sellerLink", sellerLink);
            // console.log("startDate >>>>", startDate);
            const ms = Date.parse(startDate);
            // console.log("ms >>>>", ms);
            const startDateFormat = new Date(ms + 28800000);
            // console.log("startDateFormat >>>", startDateFormat);

            const result = await this.productsService.submitBidLiveInfo(
                liveTitle,
                description,
                startDateFormat,
                liveImage,
                parseInt(userId),
                sellerLink,
                buyerLink


            );
            console.log("submitted live result (controller side)", result);
            res.json(result);
        } catch (error) {
            res.json({
                success: false,
                data: { msg: "controller submit live Input fail" },
                error: new Error("controller submit live Input fail"),
            });
        }
    };
    submitProductInfo = async (req: Request, res: Response) => {
        try {
            const productImage: any = req.file?.filename;
            const {
                name,
                minimumBid,
                eachBidAmount,
                buyPrice,
                categoryId,
                description,
                liveId,
                productIndex,
                username,
                userId
            } = req.body;

            const result = await this.productsService.submitProductInfo(
                name,
                productImage,
                parseInt(minimumBid),
                parseInt(eachBidAmount),
                parseInt(buyPrice),
                parseInt(categoryId),
                parseInt(liveId),
                description,
                productIndex,
                username,
                parseInt(userId)
            );
            console.log("result", result);
            res.json(result);
        } catch (error) {
            res.json({
                success: false,
                data: { msg: "controller submit product fail" },
                error: new Error("controller submit product fail"),
            });
        }
    };

    putBidIncrement = async (req: Request, res: Response) => {
        try {
            const { productId } = req.body;
            const result = await this.productsService.putBidIncrement(
                productId
            );
            const response = { id: productId, newPrice: result, success: true };
            res.json(response);
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    };

    startBid = async (req: Request, res: Response) => {
        try {
            const { productId, seconds } = req.body;
            const result = await this.productsService.startBid(
                productId,
                seconds
            );
            const response = { id: productId, newPrice: result, success: true };
            res.json(response);
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    };

    selectProduct = async (req: Request, res: Response) => {
        try {
            const { productId } = req.body;

            await this.productsService.selectProduct(productId);
            const response = { id: productId, success: true };
            res.json(response);
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    };
    searchProductResults = async (req: Request, res: Response) => {
        try {
            const { searchKeywords } = req.body;
            const result = await this.productsService.searchProductResults(
                searchKeywords
            );
            res.json(result);
        } catch (error) {
            res.json({
                success: false,
                data: { msg: "No relevant products" },
                error: new Error("search product fail"),
            });
        }
    };
}
