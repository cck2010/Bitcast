import { LiveStreamService } from "../service/liveStreamService";
import { Request, Response } from "express";

export class LiveStreamController {
    constructor(private liveStreamService: LiveStreamService) {}

    getRoom = async (req: Request, res: Response) => {
        try {
            const token = req.query.token as string;
            console.log(token);

            const room = await this.liveStreamService.getRoom(token);
            console.log(room);
            res.json({ room });
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    };

    getInfo = async (req: Request, res: Response) => {
        try {
            const room = req.query.room as string;
            const token = req.query.token as string;
            if (room === "" && token === "") {
                res.json({ success: false });
                return;
            }
            const result = await this.liveStreamService.getInfo(room, token);

            interface LiveStreamInfo {
                id: number;
                title: string;
                seller: string;
                sellerImage: string;
                currentViewers: number;
                thumbnail: string;
                description: string;
                success: boolean;
            }

            const response: LiveStreamInfo = {
                id: result.id,
                title: result.title,
                seller: result.seller,
                sellerImage: result.sellerImage,
                currentViewers: result.currentViewers,
                thumbnail: result.thumbnail,
                description: result.description,
                success: true,
            };

            res.json(response);
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    };

    getProducts = async (req: Request, res: Response) => {
        try {
            interface LiveStreamProduct {
                id: number;
                productName: string;
                minPrice: number;
                currentPrice: number;
                buyPrice: number;
                bidIncrement: number;
                buyerId?: number;
                productImage: string;
                isSelected: boolean;
                countdownStartTime?: Date;
                duration: number;
                isEnded: boolean;
            }

            const liveId = parseInt(req.query.liveId as string);

            if (liveId < 0) {
                const response: {
                    liveStreamProducts: LiveStreamProduct[];
                    success: boolean;
                } = { liveStreamProducts: [], success: false };
                res.json(response);
                return;
            }

            const results = await this.liveStreamService.getProducts(liveId);

            const response: {
                liveStreamProducts: LiveStreamProduct[];
                success: boolean;
            } = { liveStreamProducts: results, success: true };

            res.json(response);
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    };
}
