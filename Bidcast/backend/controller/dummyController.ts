import { DummyService } from "../service/dummyService";
import { Request, Response } from "express";

export class DummyController {
    constructor(private dummyService: DummyService) {}

    findRoom = async (req: Request, res: Response) => {
        const token = req.query.token as string;

        const result = await this.dummyService.findRoom(token);
        console.log(result);
        res.json({ result });
    };
}
