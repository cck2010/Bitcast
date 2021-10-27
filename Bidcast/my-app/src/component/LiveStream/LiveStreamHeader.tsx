import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { fetchSubscribe } from "../../redux/user/actions";
import { RootState } from "../../store";

interface LiveStreamHeaderProps {
    ws: Socket | null;
}

function LiveStreamHeader(props: LiveStreamHeaderProps) {
    //Get States
    const dispatch = useDispatch();
    const title = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.title
    );
    const seller = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.seller
    );
    const sellerId = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.sellerId
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
                <div className="row">
                    <div className="col">
                        <div className="title my-3">{title}</div>
                    </div>
                    <div className="col-2 d-flex align-items-center justify-content-end">
                        <div className="subscribe">
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    dispatch(fetchSubscribe(sellerId));
                                }}
                            >
                                關注 <i className="fas fa-bell"></i>
                            </button>
                        </div>
                    </div>
                </div>
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
