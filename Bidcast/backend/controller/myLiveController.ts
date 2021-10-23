import { Request, Response } from "express";
import { MyLiveService } from "../service/myLiveService";

export class MyLiveController {
    constructor (private myLiveService: MyLiveService) {}

    getMyLive = async (req: Request, res: Response)=>{
        try {
            const { userId } = req.query;

            console.log("dfajdkfhsajdfhkdsf");
            
            console.log(userId);
            
            const result = await this.myLiveService.getMyLive()

            // console.log(result);
            
            res.json(result)
        } catch (error) {
            res.json({
                success: false,
                data: { msg: "controller get my live fail" },
                error: new Error("get my live fail"),
            });
        }
    }
}