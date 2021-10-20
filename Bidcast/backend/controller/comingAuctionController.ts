import { Request, Response } from "express";
import { ComingAuctionService } from "../service/comingAuctionService";

export class ComingAuctionController {
    constructor(private comingAuctionService: ComingAuctionService) { }

    getComingAuction = async (req: Request, res: Response) => {
        // try {
        //     interface ComingAuction {
        //         id: number;
        //         productName: string;
        //         minPrice: number;
        //         productImage: string;
        //         duration: number;
        //     }
        //     const result = await this.comingAuctionService.getComingAuction();
        //     const response: {
        //         comingAuctions: ComingAuction[];
        //         success: boolean
        //     } = { comingAuctions: result, success: true }
        //     res.json(response)
        // } catch (error) {
        //     res.json({
        //         success: false,
        //         data: { msg: "get coming auction fail" },
        //         error: new Error("get coming auction fail"),
        //     })
        // }
        try {
            const result = await this.comingAuctionService.getComingAuction()
            res.json(result)
        } catch (error) {
            res.json({
                success:false,
                data:{msg:"controller get coming auction fail"},
                error: new Error("get coming auction fail"),
            })
        }
    }
}