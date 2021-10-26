import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { RootState } from "../../store";

interface LiveStreamHeaderProps {
    ws: Socket | null;
}

function LiveStreamHeader(props: LiveStreamHeaderProps) {
    //Get States
    const title = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.title
    );
    const seller = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.seller
    );
    const sellerImage = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.sellerImage
    );
    const description = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.description
    );
    const liveId = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.id
    );
    const [onlineUsers, setOnlineUsers] = useState<number>(0);
    const [timerId, setTimerId] = useState<number>(0);
    //Get States

    //WebSocket Signal Handler
    useEffect(() => {
        if (timerId === 0) {
            if (props.ws) {
                setTimerId(
                    window.setInterval(() => {
                        if (props.ws) {
                            props.ws.emit("checkOnlineUsers", liveId);
                        }
                    }, 10000)
                );
                props.ws.on("checkOnlineUsers", (clientsInRoom: number) => {
                    setOnlineUsers(clientsInRoom);
                });
            }
        }

        return () => {
            clearInterval(timerId);
        };
    }, [props.ws, timerId, liveId]);
    //WebSocket Signal Handler

    return (
        <div className="LiveStreamHeader px-3">
            <div className="mainInfo">
                <div className="title my-3">{title}</div>
                <div className="userinfo d-flex align-items-center mb-4">
                    <img
                        className="profilePic rounded-circle"
                        src={`${
                            sellerImage.search(/(https:\/\/)|(http:\/\/)/i) < 0
                                ? process.env.REACT_APP_BACKEND_URL +
                                  "/" +
                                  sellerImage
                                : sellerImage
                        }`}
                        alt="profilePic"
                    />
                    <div className="username mx-3">{seller}</div>
                    <div className="viewers">
                        正在觀看人數: {onlineUsers}{" "}
                        <i className="fas fa-user-friends"></i>
                    </div>
                </div>
                <div className="description m-3 mb-5">{description}</div>
            </div>
        </div>
    );
}

export default LiveStreamHeader;
