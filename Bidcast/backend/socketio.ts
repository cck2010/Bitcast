import socketIO, { Socket } from "socket.io";
import { ChatMessageWithSuccess } from "./controller/liveStreamController";

export let io: socketIO.Server;

export function setSocketIO(io: socketIO.Server) {
    io.on("connection", (socket: Socket) => {
        socket.on("joinRoom", (room: number) => {
            socket.join(room.toString());
            socket.to(room.toString()).emit("joinRoom", "已有新人加入！");
        });
        socket.on("render", (Arr: number[]) => {
            let room = Arr[0];
            let productId = Arr[1];
            io.sockets.in(room.toString()).emit("render", productId);
        });
        socket.on("startBid", (room: number) => {
            io.sockets.in(room.toString()).emit("startBid", room);
        });
        socket.on("updateCurrentPrice", (room: number, isEnded: boolean) => {
            io.sockets
                .in(room.toString())
                .emit("updateCurrentPrice", room, isEnded);
        });
        socket.on(
            "sendMessage",
            (room: number, message: ChatMessageWithSuccess) => {
                io.sockets.in(room.toString()).emit("sendMessage", message);
            }
        );
    });
}
