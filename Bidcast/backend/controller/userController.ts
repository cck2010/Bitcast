import { UserService } from "../service/userService";
import { Request, Response } from "express";
import jwtKey from "../jwt/jwt"
import jwt from "jsonwebtoken"
// import fetch from "node-fetch";
// import { ResponseJson } from "../response";
// import passport from 'passport';

// import passport from 'passport';
// import { env } from "../env";

export class UserController {
    constructor(private userService: UserService) { }
    register = async (req: Request, res: Response) => {
        try {
            const { alias, email, password } = req.body;
            const result: any = await this.userService.register(
                alias,
                email,
                password
            );
            // console.log(result);

            if (result.success) {
                await this.userService.login(email, password);
                // req.session["user"] = result.data.user;
                res.json(result);
            } else {
                res.json(result);
                console.log('res.json(result)=', result)
            }
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                error: err,
                data: {
                    msg: "register controller failure",
                },
            });
        }
    };
    getUser = async (req: Request, res: Response) => {
        try {
            // if (req.session["user"]) {
            //     res.json(req.session["user"]);
            // } else {
            //     res.json({ msg: "no current user" });
            // }
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                error: err,
                data: {
                    msg: "getUser controller failure",
                },
            });
        }
    };

    logout = async (req: Request, res: Response) => {
        try {
            // delete req.session["user"];
            res.json({
                success: true,
                data: {
                    msg: "Logged Out successfully",
                },
            });
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                error: err,
                data: {
                    msg: "logout controller failure",
                },
            });
        }
    };
    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const result: any = await this.userService.login(email, password);
            // if (result.data?.user) {
            //     req.session["user"] = result.data.user;
            // }
            if (result.data?.user) {
                const payload = {
                    id: result.data.user.id,
                    alias: result.data.user.alias,
                    email: result.data.user.email,
                    number_tag: result.data.user.number_tag,
                    created_at: result.data.user.created_at,
                    updated_at: result.data.user.updated_at,

                }
                const a = 'http://localhost:3000'
                const signOptions: {} = {
                    audience: a,
                    expiresIn: "12h",
                    algorithm: "RS512" 			// RSASSA options[ "RS256", "RS384", "RS512" ]
                };

                const token = jwt.sign(payload, jwtKey.privateKEY, signOptions);
                res.json({
                    token: token,
                });
            }

        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                error: err,
                data: {
                    msg: "login controller failure",
                },
            });
        }
    };






}
