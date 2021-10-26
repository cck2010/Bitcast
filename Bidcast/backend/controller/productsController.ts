import { Request, Response } from "express";
import { v4 } from "uuid";
import { ProductsService } from "../service/productsService";

export class ProductsController {
    constructor(private productsService: ProductsService) {}

    getCategories = async (req: Request, res: Response) => {
        try {
            const result = await this.productsService.getCategories();
            // console.log("result", result);
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
            const liveImage: string | undefined = req.file?.filename;

            const { liveTitle, description, startDate, userId } = req.body;

            const ms = Date.parse(startDate);
            const startDateFormat = new Date(ms + 28800000);

            // let sellerLink = "1123";
            // let buyerLink = "232323";
            // let sellerLink = await v4().substring(0,8);
            // let buyerLink = await v4().substring(0,8);
            let sellerLink = await v4();
            let buyerLink = await v4();
            // console.log("buyerLink", buyerLink);
            // console.log("sellerLink", sellerLink);

            const result = await this.productsService.submitBidLiveInfo(
                liveTitle,
                description,
                startDateFormat,
                liveImage,
                parseInt(userId),
                sellerLink,
                buyerLink
            );
            // console.log("submitted live result (controller side)", result);
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
                userId,
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
            // console.log("result", result);
            res.json(result);
        } catch (error) {
            res.json({
                success: false,
                data: { msg: "controller submit product fail" },
                error: new Error("controller submit product fail"),
            });
        }
    };

    putcurrentPrice = async (req: Request, res: Response) => {
        try {
            const { productId, bidAmount, addCurrentPrice } = req.body;
            const userId = req.user && req.user.id ? req.user.id : 0;
            const username =
                req.user && req.user.username ? req.user.username : "";

            const result = await this.productsService.putcurrentPrice(
                productId,
                bidAmount,
                addCurrentPrice,
                userId
            );
            const response = {
                id: productId,
                newPrice: result.currentPrice,
                buyer: username,
                isEnded: result.isEnded,
                success: result.success,
            };
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
            if (result[1]) {
                setTimeout(() => {
                    this.productsService.telegramBidResult(productId);
                }, (seconds + 10) * 1000);
                // }, 1000);
            }
            const response = {
                id: productId,
                countdownEndTime: result[0],
                success: result[1],
            };
            res.json(response);
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    };

    selectProduct = async (req: Request, res: Response) => {
        try {
            const { productId } = req.body;

            const result = await this.productsService.selectProduct(productId);
            const response = { id: productId, success: result };
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
