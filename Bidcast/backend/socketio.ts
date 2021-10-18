import socketIO from "socket.io";
// import express from "express";
// import { logger } from "./logger";
// import { format } from 'date-fns';

export let io: socketIO.Server;


// type members = member[]

// type member = {
//     socketID: string;
//     userID: string;
//     userEmail: string;
//     lastSeen: string;

// }

// let members: member[] = [];

export function setSocketIO(value: socketIO.Server) {
    io = value;
    io.on("connection", (socket: any) => {
        // console.log(session);
        //     if ((socket.request as express.Request).session['user']) {
        //         let user = (socket.request as express.Request).session['user']
        //         // console.log("(socket.request as express.Request).session", (socket.request as express.Request).session);
        //         // console.log(" user",  user);
        //         let time = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        //     let member = {
        //         socketID: socket!['id'],
        //         userID: user.id,
        //         userEmail: user.email,
        //         lastSeen: time
        //     }
        //     members.push(member)
        //     let currentTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        //     // console.table(members);

        //     io.emit("getMemberOnline",members,currentTime)
        //     // console.log("socket", socket.id);
        //     logger.info(`[New socket] , ${socket.id}`);
        // }

        // socket.on("")
    });
}
