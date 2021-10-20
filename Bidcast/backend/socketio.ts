import socketIO from "socket.io";

export let io: socketIO.Server;

export function setSocketIO(io: socketIO.Server) {
    io.on("connection", (socket: any) => {});
}
