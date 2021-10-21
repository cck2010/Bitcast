import React, { useEffect, useRef, useState } from "react";
import "./LiveStream.scss";
import LiveStreamChatRoom from "../../component/LiveStream/LiveStreamChatRoom";
import LiveStreamRecommend from "../../component/LiveStream/LiveStreamRecommend";
import LiveStreamHeader from "../../component/LiveStream/LiveStreamHeader";
import { useMediaQuery } from "react-responsive";
import { Button, ButtonGroup } from "reactstrap";
import LiveStreamWindowSeller from "../../component/LiveStream/LiveStreamWindowSeller";
import LiveStreamControlPanelSeller from "../../component/LiveStream/LiveStreamControlPanelSeller";
import {
    fetchliveStreamInfo,
    fetchliveStreamProducts,
} from "../../redux/LiveStream/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import io, { Socket } from "socket.io-client";
import LiveStreamBiddingInfoSeller from "../../component/LiveStream/LiveStreamBiddingInfoSeller";

function LiveStream() {
    const liveStreamRef = useRef<HTMLDivElement>(null);

    // react-responsive
    const isDesktop = useMediaQuery({
        query: "(min-width: 1200px)",
    });

    const isTablet = useMediaQuery({
        query: "(min-width: 768px)",
    });

    const [page, setPage] = useState<number>(1);

    // fetch info
    const dispatch = useDispatch();

    useEffect(() => {
        let room = new URLSearchParams(window.location.search).get("room");
        room = room != null ? room : "";
        let token = new URLSearchParams(window.location.search).get("token");
        token = token != null ? token : "";

        dispatch(fetchliveStreamInfo(room, token));
    }, [dispatch]);

    const liveId = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.id
    );

    useEffect(() => {
        if (liveId !== 0) {
            dispatch(fetchliveStreamProducts(liveId, true));
        }
    }, [dispatch, liveId]);

    // connect socket.io
    const [ws, setWs] = useState<Socket | null>(null);

    const connectWebSocket = () => {
        if (process.env.REACT_APP_BACKEND_URL !== undefined) {
            setWs(io(process.env.REACT_APP_BACKEND_URL));
        }
    };

    if (liveId > 0 && ws === null) {
        connectWebSocket();
    }

    useEffect(() => {
        if (ws) {
            const initWebSocket = () => {
                if (ws) {
                    ws.emit("joinRoom", liveId);
                    ws.on("joinRoom", (message) => {
                        console.log(message);
                    });
                    ws.on("render", () => {
                        dispatch(fetchliveStreamProducts(liveId, false));
                    });
                }
            };
            initWebSocket();
        }
    }, [dispatch, ws, liveId]);

    return (
        <div className="LiveStream m-3" ref={liveStreamRef}>
            <div className="row">
                <div className={`${isTablet ? "col-8" : "col"}`}>
                    <LiveStreamWindowSeller />
                    {isTablet ? (
                        <>
                            <LiveStreamHeader />
                            <LiveStreamControlPanelSeller
                                isDesktop={isDesktop}
                                isTablet={isTablet}
                                ws={ws}
                            />
                            <div className="row mt-3 rounded">
                                <div className={`col-12`}>
                                    <LiveStreamBiddingInfoSeller />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <ButtonGroup className="w-100">
                                <Button onClick={() => setPage(1)}>
                                    直播資料
                                </Button>
                                <Button onClick={() => setPage(2)}>
                                    拍賣設定
                                </Button>
                                <Button onClick={() => setPage(3)}>
                                    聊天室
                                </Button>
                                <Button onClick={() => setPage(4)}>
                                    其他拍賣直播
                                </Button>
                            </ButtonGroup>
                            {page === 1 && <LiveStreamHeader />}
                            {page === 2 && (
                                <>
                                    <LiveStreamControlPanelSeller
                                        isDesktop={isDesktop}
                                        isTablet={isTablet}
                                        ws={ws}
                                    />
                                    <div className="row mt-3 rounded">
                                        <div className={`col-12`}>
                                            <LiveStreamBiddingInfoSeller />
                                        </div>
                                    </div>
                                </>
                            )}
                            {page === 3 && (
                                <LiveStreamChatRoom
                                    liveStreamRef={liveStreamRef}
                                    isTablet={isTablet}
                                />
                            )}
                            {page === 4 && <LiveStreamRecommend />}
                        </>
                    )}
                </div>
                {isTablet && (
                    <div className="col-4">
                        <div className="row">
                            <div className="col">
                                <LiveStreamChatRoom
                                    liveStreamRef={liveStreamRef}
                                    isTablet={isTablet}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <LiveStreamRecommend />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LiveStream;
