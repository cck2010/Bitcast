import { Request, Response } from "express";
import { ComingAuctionService } from "../service/comingAuctionService";

export class ComingAuctionController {
    constructor(private comingAuctionService: ComingAuctionService) { }

    getComingAuction = async (req: Request, res: Response) => {
        try {
            interface ComingAuction {
               
            }
            const result = await this.comingAuctionService.getComingAuction();
            res.json(result)
        } catch (error) {
            res.json({
                success: false,
                data: { msg: "get coming auction fail" },
                error: new Error("get coming auction fail"),
            })
        }
    }
}