// import jwtKey from './jwt/jwt'
// import jwt from 'jsonwebtoken'
// import { Bearer } from 'permit'
// import express from 'express'
// import { UserService } from './UserService'

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

//         const payload = jwtSimple.decode(token, jwt.jwtSecret)
//         // database check
//         const user = userService.findUserById(payload.id)
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