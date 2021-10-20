import socketIO, { Socket } from "socket.io";

export let io: socketIO.Server;

export function setSocketIO(io: socketIO.Server) {
    io.on("connection", (socket: Socket) => {
        socket.on("joinRoom", (room: number) => {
            socket.join(room.toString());
            socket.to(room.toString()).emit("joinRoom", "已有新人加入！");
        });
        socket.on("render", (Arr: number[]) => {
            let room = Arr[0];
            let slideIndex = Arr[1];

            socket.to(room.toString()).emit("render", slideIndex);
        });
    });
}
