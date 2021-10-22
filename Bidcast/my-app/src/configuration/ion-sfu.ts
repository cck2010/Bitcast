import { Configuration } from "ion-sdk-js/lib/client.d";

export const config: Configuration = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
        // {
        //     urls: "turn:turn.ctosan.xyz:3478",
        //     username: "hello",
        //     credential: "world",
        // },
        {
            urls: "turn:turn.bidcast.online:3478",
            username: "hello",
            credential: "world",
        },
    ],
    codec: "h264",
};

export const webSocketIP = "wss://54.251.210.79/ws";

export const webSocketIPBackUp = "wss://54.251.68.107/ws";
