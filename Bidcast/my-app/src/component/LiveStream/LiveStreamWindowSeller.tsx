import React, { useEffect, useRef, useState } from "react";
import { Client, LocalStream } from "ion-sdk-js";
import { IonSFUJSONRPCSignal } from "ion-sdk-js/lib/signal/json-rpc-impl";
import { config, webSocketIP } from "../../configuration/ion-sfu";
import { useLiveStreamToken } from "../../hooks/useLiveStreamToken";
import { ButtonGroup } from "reactstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function LiveStreamWindow() {
    const pubVideo = useRef<HTMLVideoElement>(null);
    const preventFirstTime = useRef<boolean>(true);

    const [client, setClient] = useState<Client | null>(null);
    let signal: IonSFUJSONRPCSignal | null = null;
    let localStream: LocalStream | null = null;

    const token: string | null = new URLSearchParams(
        window.location.search
    ).get("token");

    const room = useLiveStreamToken(token);

    const thumbnail = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.thumbnail
    );

    let [timerId, setTimerId] = useState<NodeJS.Timeout>(
        setInterval(() => {}, 45000)
    );

    useEffect(() => {
        if (!preventFirstTime.current && !client) {
            console.log("start", room);
            // signal = new IonSFUJSONRPCSignal(webSocketIPBackUp);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            signal = new IonSFUJSONRPCSignal(webSocketIP);
            let ClientConnection = new Client(signal, config);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            signal.onopen = () => {
                if (ClientConnection == null) {
                    return;
                }
                ClientConnection.join(`test room ${room}`, "");
            };
            setClient(ClientConnection);
            // setTimeout(() => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setTimerId(
                setInterval(
                    () => signal != null && signal.notify("method", "params"),
                    45000
                )
            );

            // }, 10000);
        }

        return () => {
            if (preventFirstTime.current) {
                preventFirstTime.current = false;
            }
        };
    }, [room, timerId]);

    useEffect(() => {
        return () => {
            console.log("ended connection", client);
            clearInterval(timerId);
            client?.close();
            signal?.close();
        };
    }, [client, signal, timerId]);

    const start = (event: boolean): void => {
        if (event) {
            LocalStream.getUserMedia({
                resolution: "vga",
                // resolution: "hd",
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
                // resolution: "hd",
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
        <div className="LiveStreamWindowSeller">
            <div className="flex flex-col h-screen relative">
                {client != null && (
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
                )}

                <video
                    id="pubVideo"
                    poster="transparent.png"
                    className="w-100 h-100"
                    controls
                    ref={pubVideo}
                    style={{
                        backgroundImage: `url("${thumbnail}")`,
                    }}
                ></video>
            </div>
        </div>
    );
}

export default LiveStreamWindow;
