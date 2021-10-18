import React, { useEffect, useRef } from "react";
import { Client, LocalStream } from "ion-sdk-js";
import { IonSFUJSONRPCSignal } from "ion-sdk-js/lib/signal/json-rpc-impl";
import { Configuration } from "ion-sdk-js/lib/client.d";

function LiveStreamWindow() {
    const pubVideo = useRef<HTMLVideoElement>(null);

    let client: Client | null = null;
    let signal: IonSFUJSONRPCSignal | null = null;
    let localStream: LocalStream | null = null;

    const config: Configuration = {
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

    const room: string | null = new URLSearchParams(window.location.search).get(
        "room"
    );

    useEffect(() => {
        // signal = new IonSFUJSONRPCSignal("ws://54.251.68.107/ws");
        // eslint-disable-next-line react-hooks/exhaustive-deps
        signal = new IonSFUJSONRPCSignal("ws://54.251.210.79/ws");
        // eslint-disable-next-line react-hooks/exhaustive-deps
        client = new Client(signal, config);
        signal.onopen = () => {
            if (client == null) {
                return;
            }
            client.join(`test room ${room}`, "");
        };
        let timerId: NodeJS.Timeout = setInterval(() => {}, 10000);
        setTimeout(() => {
            timerId = setInterval(
                () => signal != null && signal.notify("method", "params"),
                10000
            );
        }, 10000);

        return clearInterval(timerId);
    }, []);

    const start = (event: boolean): void => {
        if (event) {
            LocalStream.getUserMedia({
                resolution: "vga",
                audio: true,
                codec: "vp8",
            })
                .then((media) => {
                    if (pubVideo.current === null || client === null) {
                        return;
                    }
                    pubVideo.current.srcObject = media;
                    pubVideo.current.controls = true;
                    pubVideo.current.autoplay = true;
                    pubVideo.current.muted = false;
                    localStream = media;
                    client.publish(media);
                })
                .catch(console.error);
        } else {
            LocalStream.getDisplayMedia({
                resolution: "vga",
                video: true,
                audio: true,
                codec: "vp8",
            })
                .then((media) => {
                    if (pubVideo.current === null || client === null) {
                        return;
                    }
                    pubVideo.current.srcObject = media;
                    pubVideo.current.controls = true;
                    pubVideo.current.autoplay = true;
                    pubVideo.current.muted = false;
                    localStream = media;
                    client.publish(media);
                })
                .catch(console.error);
        }
    };

    const stop = (): void => {
        if (pubVideo.current == null || localStream == null) {
            return;
        }
        localStream.unpublish();
        pubVideo.current.srcObject = null;
    };

    return (
        <div className="LiveStreamWindow">
            <div className="flex flex-col h-screen relative">
                <header className="flex h-16 justify-center items-center text-xl bg-black text-white">
                    <div className="absolute top-2 right-5">
                        <button
                            id="bnt_pubcam"
                            className="bg-blue-500 px-4 py-2 text-white rounded-lg mr-5"
                            onClick={() => start(true)}
                        >
                            Publish Camera
                        </button>
                        <button
                            id="bnt_pubscreen"
                            className="bg-green-500 px-4 py-2 text-white rounded-lg"
                            onClick={() => start(false)}
                        >
                            Publish Screen
                        </button>
                        <button
                            id="bnt_pubscreen"
                            className="bg-green-500 px-4 py-2 text-white rounded-lg"
                            onClick={() => stop()}
                        >
                            Shut Up
                        </button>
                    </div>
                </header>
                <video
                    id="pubVideo"
                    className="bg-black w-100 h-100"
                    controls
                    ref={pubVideo}
                ></video>
                )
            </div>
        </div>
    );
}

export default LiveStreamWindow;
