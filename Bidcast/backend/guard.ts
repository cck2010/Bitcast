// import jwtKey from './jwt/jwt'
// import jwt from 'jsonwebtoken'
// import { Bearer } from 'permit'
// import express from 'express'
// import { UserService } from './service/userService'

// const permit = new Bearer({
//     query: 'access_token'
// })
// const userService = new UserService();


// declare global {
//     namespace Express {
//         interface Request {
//             user?: {
//                 username: string;
//                 id: number
//             }
//         }
//     }
// }

// interface verifyOptions {
//     expiresIn: string;
//     algorithm: string;
// }

// export async function isLoggedIn(
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
// ) {
//     try {
//         const token = permit.check(req);
//         if (!token) {
//             return res.status(401).json("Unauthorized")
//         }


//         const verifyOptions: verifyOptions = {

//             expiresIn: "12h",
//             algorithm: "RS512"
//         };
//         const payload = jwt.verify(token, jwtKey.publicKEY, verifyOptions as {});
//         // database check
//         const user = userService.getCurrentUser(payload.id)
//         if (user) {
//             req.user = user
//             return next();
//         } else {
//             return res.status(401).json("Unauthorized")
//         }

//     } catch (e) {
//         console.error(e);

//         return res.status(401).json("Incorrect token")
//     }
// }