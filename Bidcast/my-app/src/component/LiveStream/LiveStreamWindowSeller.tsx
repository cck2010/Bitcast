import React, { useEffect, useRef } from "react";
import { Client, LocalStream } from "ion-sdk-js";
import { IonSFUJSONRPCSignal } from "ion-sdk-js/lib/signal/json-rpc-impl";
import { config, webSocketIP } from "../../configuration/ion-sfu";
import { useLiveStreamToken } from "../../hooks/useLiveStreamToken";
import { Button, ButtonGroup } from "reactstrap";

function LiveStreamWindow() {
    const pubVideo = useRef<HTMLVideoElement>(null);
    const preventFirstTime = useRef<boolean>(true);

    let client: Client | null = null;
    let signal: IonSFUJSONRPCSignal | null = null;
    let localStream: LocalStream | null = null;

    const token: string | null = new URLSearchParams(
        window.location.search
    ).get("token");

    const room = useLiveStreamToken(token);

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
            client.join(`test room ${room}`, "");
        };
        let timerId: NodeJS.Timeout = setInterval(() => {}, 45000);
        setTimeout(() => {
            timerId = setInterval(
                () => signal != null && signal.notify("method", "params"),
                45000
            );
        }, 10000);

        return () => {
            clearInterval(timerId);
            if (preventFirstTime.current) {
                console.log(preventFirstTime);

                preventFirstTime.current = false;
            } else {
                client?.leave();
                signal?.close();
            }
        };
    }, [room]);

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
                <ButtonGroup className="w-100">
                    <button
                        className="btn btn-primary"
                        onClick={() => start(true)}
                    >
                        鏡頭直播
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={() => start(false)}
                    >
                        電腦畫面直播
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => stop()}
                    >
                        停止直播
                    </button>
                </ButtonGroup>
                <video
                    id="pubVideo"
                    className="bg-black w-100 h-100"
                    controls
                    ref={pubVideo}
                ></video>
            </div>
        </div>
    );
}

export default LiveStreamWindow;
