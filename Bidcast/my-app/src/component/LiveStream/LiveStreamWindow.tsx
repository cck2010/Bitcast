import React, { useEffect, useRef } from "react";
import { Client } from "ion-sdk-js";
import { IonSFUJSONRPCSignal } from "ion-sdk-js/lib/signal/json-rpc-impl";
import { config, webSocketIP } from "../../configuration/ion-sfu";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function LiveStreamWindow() {
    const subVideo = useRef<HTMLVideoElement>(null);

    let client: Client | null = null;
    let signal: IonSFUJSONRPCSignal | null = null;

    const room: string | null = new URLSearchParams(window.location.search).get(
        "room"
    );

    const thumbnail = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.thumbnail
    );

    useEffect(() => {
        // signal = new IonSFUJSONRPCSignal(webSocketIPBackUp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        signal = new IonSFUJSONRPCSignal(webSocketIP);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        client = new Client(signal, config);
        signal.onopen = () => {
            if (client == null) {
                return;
            }
            client.join(`room ${room}`, "");
        };
        let timerId: NodeJS.Timeout = setInterval(() => {}, 10000);
        setTimeout(() => {
            timerId = setInterval(
                () => signal != null && signal.notify("method", "params"),
                10000
            );
        }, 10000);

        client.ontrack = (track, stream) => {
            console.log("got track: ", track.id, "for stream: ", stream.id);
            track.onunmute = () => {
                if (subVideo.current === null) {
                    return;
                }
                subVideo.current.srcObject = stream;
                subVideo.current.controls = true;
                subVideo.current.autoplay = true;
                subVideo.current.muted = false;

                stream.onremovetrack = () => {
                    if (subVideo.current === null) {
                        return;
                    }
                    subVideo.current.srcObject = null;
                };
            };
        };

        return clearInterval(timerId);
    }, []);

    return (
        <div className="LiveStreamWindow">
            <div className="flex flex-col h-screen relative">
                <header className="flex h-16 justify-center items-center text-xl bg-black text-white"></header>
                <video
                    id="subVideo"
                    poster="transparent.png"
                    className="w-100 h-100"
                    controls
                    ref={subVideo}
                    style={{
                        backgroundImage: `url("${thumbnail}")`,
                    }}
                ></video>
            </div>
        </div>
    );
}

export default LiveStreamWindow;
