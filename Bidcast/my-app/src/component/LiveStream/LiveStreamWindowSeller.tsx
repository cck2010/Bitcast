import React, { useEffect, useRef, useState } from "react";
import { Client, LocalStream } from "ion-sdk-js";
import { IonSFUJSONRPCSignal } from "ion-sdk-js/lib/signal/json-rpc-impl";
import { config, webSocketIP } from "../../configuration/ion-sfu";
import { ButtonGroup } from "reactstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useFetch from "react-fetch-hook";

function LiveStreamWindow() {
    const pubVideo = useRef<HTMLVideoElement>(null);

    const [client, setClient] = useState<Client | null>(null);
    let signal: IonSFUJSONRPCSignal | null = null;
    const [localStream, setLocalStream] = useState<LocalStream | null>(null);

    const token: string | null = new URLSearchParams(
        window.location.search
    ).get("token");

    const result = useFetch<{ room: string }>(
        `${process.env.REACT_APP_BACKEND_URL}/room?token=${token}`
    );

    const thumbnail = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.thumbnail
    );

    let [timerId, setTimerId] = useState<NodeJS.Timeout>(
        setInterval(() => {}, 45000)
    );

    useEffect(() => {
        if (!result.isLoading && !client) {
            // signal = new IonSFUJSONRPCSignal(webSocketIPBackUp);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            signal = new IonSFUJSONRPCSignal(webSocketIP);
            let ClientConnection = new Client(signal, config);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            signal.onopen = () => {
                if (ClientConnection == null) {
                    return;
                }
                ClientConnection.join(`room ${result.data?.room}`, "");
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
    }, [result]);

    useEffect(() => {
        return () => {
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
                    setLocalStream(media);
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
                    setLocalStream(media);
                    client.publish(media);
                })
                .catch(console.error);
        }
    };

    const stop = (): void => {
        if (pubVideo.current == null || localStream == null) {
            return;
        }
        let tracks = localStream.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
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
