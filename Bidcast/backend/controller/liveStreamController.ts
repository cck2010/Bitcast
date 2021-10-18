import { LiveStreamService } from "../service/liveStreamService";
import { Request, Response } from "express";

export class LiveStreamController {
    constructor(private liveStreamService: LiveStreamService) {}

    getRoom = async (req: Request, res: Response) => {
        const token = req.query.token as string;
        console.log(token);

        const room = await this.liveStreamService.getRoom(token);
        console.log(room);
        res.json({ room });
    };

    getInfo = async (req: Request, res: Response) => {
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
        }

        const response: LiveStreamInfo = {
            id: result.id,
            title: result.title,
            seller: result.seller,
            sellerImage: result.sellerImage,
            currentViewers: result.currentViewers,
            thumbnail: result.thumbnail,
        };

        res.json(response);
    };
}
