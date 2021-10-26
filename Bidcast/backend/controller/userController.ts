import { UserService } from "../service/userService";
import { Request, Response } from "express";
import jwtKey from "../jwt/jwt"
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user?: {
                id?: number;
                username?: string;
                email?: string;
                role_id?: number;
                created_at?: Date;
                updated_at?: Date;
                profile_pic?: string;
                status_id?: number;
                phone_number?: number;
                telegram_acct?: string;
                telegram_is_verified?: boolean;
                telegram_chat_id?: number;
                login_method_id?: number;
            };
        }
    }
}
export class UserController {
    constructor(private userService: UserService) { }
    register = async (req: Request, res: Response) => {
        try {
            const { username, email, password, phoneNumber } = req.body;
            // console.log(username, email, password, phoneNumber);

            const result: any = await this.userService.register(
                username,
                email,
                password,
                phoneNumber
            );
            // console.log(result);

            if (!(result.success)) {
                // console.log('not success');

                return res.json(result);
            }

            const payload = result.data.user
            const signOptions: {} = {

                expiresIn: "12h",
                algorithm: "RS512" 			// RSASSA options[ "RS256", "RS384", "RS512" ]
            };

            const token = jwt.sign(payload, jwtKey.privateKEY, signOptions);

            return res.json({
                token: token,

            });
            // req.session["user"] = result.data.user;
        } catch (err) {
            console.log(err);
            return res.json({
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
            if (result.success === true) {
                const payload = result.data.user
                const signOptions: {} = {

                    expiresIn: "12h",
                    algorithm: "RS512" 			// RSASSA options[ "RS256", "RS384", "RS512" ]
                };

                const token = jwt.sign(payload, jwtKey.privateKEY, signOptions);

                return res.json({
                    token: token,

                });
            }
            return res.json(result);

        } catch (err) {
            console.log(err);
            return res.json({
                success: false,
                error: err,
                data: {
                    msg: "login controller failure",
                },
            });
        }
    };
    getCurrentUser = async (req: Request, res: Response) => {
        try {
            const payload = req.user
            const signOptions: {} = {

                expiresIn: "12h",
                algorithm: "RS512" 			// RSASSA options[ "RS256", "RS384", "RS512" ]
            };

            if (payload) {
                const token = jwt.sign(payload, jwtKey.privateKEY, signOptions);

                return res.json(token);
            } else {
                return res.status(401).json({
                    token: null,
                    message: 'Incorrect token'
                })
            }


        } catch (err) {
            console.log(err);
            return res.json({
                success: false,
                error: err,
                data: {
                    msg: "getCurrentUser controller failure",
                },
            });
        }
    }
    loginFacebook = async (req: Request, res: Response) => {
        try {
            const facebookInfo = req.body;
            const result = await this.userService.FacebookLogin(facebookInfo.email, facebookInfo.name, facebookInfo.image)
            const payload = result.data.user
            const signOptions: {} = {

                expiresIn: "12h",
                algorithm: "RS512" 			// RSASSA options[ "RS256", "RS384", "RS512" ]
            };

            if (payload) {
                const token = jwt.sign(payload, jwtKey.privateKEY, signOptions);

                return res.json({
                    token: token,

                });
            } else {
                return res.status(401).json({
                    token: null,
                    message: 'Incorrect token'
                })
            }
        } catch (e) {
            console.log(e);

            return res.json({
                token: null,
                message: 'loginGoole unknow error'
            })
        }
    }
    loginGoogle = async (req: Request, res: Response) => {
        try {
            const googleInfo = req.body;
            const result = await this.userService.googleLogin(googleInfo.name, googleInfo.email, googleInfo.image)
            const payload = result.data.user
            const signOptions: {} = {

                expiresIn: "12h",
                algorithm: "RS512" 			// RSASSA options[ "RS256", "RS384", "RS512" ]
            };

            if (payload) {
                const token = jwt.sign(payload, jwtKey.privateKEY, signOptions);

                return res.json({
                    token: token,

                });
            } else {
                return res.status(401).json({
                    token: null,
                    message: 'Incorrect token'
                })
            }
        } catch (e) {
            console.log(e);

            return res.json({
                token: null,
                message: 'loginGoole unknow error'

            })
        }

    }
}