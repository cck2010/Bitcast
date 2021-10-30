import React, { useEffect, useRef, useState } from "react";
import "./LiveStream.scss";
import LiveStreamChatRoom from "../../component/LiveStream/LiveStreamChatRoom";
import LiveStreamRecommendSeller from "../../component/LiveStream/LiveStreamRecommendSeller";
import LiveStreamHeader from "../../component/LiveStream/LiveStreamHeader";
import { useMediaQuery } from "react-responsive";
import { Button, ButtonGroup } from "reactstrap";
import LiveStreamWindowSeller from "../../component/LiveStream/LiveStreamWindowSeller";
import LiveStreamControlPanelSeller from "../../component/LiveStream/LiveStreamControlPanelSeller";
import {
    changeDummy,
    fetchInitialChatMessages,
    fetchliveStreamInfo,
    fetchliveStreamProducts,
    fetchSameCategoryLive,
    resetLiveId,
} from "../../redux/LiveStream/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import io, { Socket } from "socket.io-client";
import LiveStreamBiddingInfoSeller from "../../component/LiveStream/LiveStreamBiddingInfoSeller";

interface LiveStreamProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function LiveStream(props: LiveStreamProps) {
    //Get States
    const dispatch = useDispatch();
    const liveStreamRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let room = new URLSearchParams(window.location.search).get("room");
        room = room != null ? room : "";
        let token = new URLSearchParams(window.location.search).get("token");
        token = token != null ? token : "";

        dispatch(fetchliveStreamInfo(room, token));
        return () => {
            dispatch(resetLiveId());
        };
    }, [dispatch]);

    const liveId = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.id
    );

    useEffect(() => {
        if (liveId !== 0) {
            dispatch(fetchliveStreamProducts(liveId, true));
            dispatch(fetchInitialChatMessages(liveId));
        }
    }, [dispatch, liveId]);

    const recommendProducts = useSelector(
        (state: RootState) =>
            state.liveStream.liveStreamProducts.liveStreamProductsArr
    );

    useEffect(() => {
        let categoryIdSet = new Set<number>();
        for (let product of recommendProducts) {
            categoryIdSet.add(product.categoryId);
        }
        dispatch(
            fetchSameCategoryLive(liveId, categoryIdSet, props.setIsLoading)
        );
    }, [dispatch, recommendProducts, liveId, props]);

    useEffect(() => {
        if (liveId === 0) {
            props.setIsLoading(true);
        }
    }, [props, liveId]);
    //Get States

    //React-responsive
    const isDesktop = useMediaQuery({
        query: "(min-width: 1200px)",
    });
    const isTablet = useMediaQuery({
        query: "(min-width: 768px)",
    });
    const [page, setPage] = useState<number>(1);
    //React-responsive

    //Websocket Setup
    const [ws, setWs] = useState<Socket | null>(null);

    useEffect(() => {
        const connectWebSocket = () => {
            if (process.env.REACT_APP_BACKEND_URL !== undefined) {
                setWs(io(process.env.REACT_APP_BACKEND_URL));
            }
        };

        if (liveId > 0 && ws === null) {
            connectWebSocket();
        }

        if (ws) {
            const initWebSocket = () => {
                if (ws) {
                    ws.emit("joinRoom", liveId);
                    ws.on("render", () => {
                        dispatch(fetchliveStreamProducts(liveId, false));
                    });
                }
            };
            initWebSocket();
        }
    }, [dispatch, ws, liveId]);

    useEffect(() => {
        return () => {
            ws?.close();
        };
    }, [ws]);
    //Websocket Setup

    //Add event listener
    useEffect(() => {
        const popstaeHandler = () => {
            dispatch(changeDummy());
        };
        window.addEventListener("popstate", popstaeHandler);
        return () => {
            window.removeEventListener("popstate", popstaeHandler);
        };
    }, [dispatch]);
    //Add event listener

    return (
        <div className={`LiveStream m-3`} ref={liveStreamRef}>
            <div className="row">
                <div className={`${isTablet ? "col-8" : "col"}`}>
                    <LiveStreamWindowSeller />
                    {isTablet ? (
                        <>
                            <div className="row mt-3 rounded">
                                <div className={`col-12`}>
                                    <LiveStreamBiddingInfoSeller ws={ws} />
                                </div>
                            </div>
                            <LiveStreamControlPanelSeller
                                isDesktop={isDesktop}
                                isTablet={isTablet}
                                ws={ws}
                            />
                            <LiveStreamHeader ws={ws} />
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
                            {page === 1 && <LiveStreamHeader ws={ws} />}
                            {page === 2 && (
                                <>
                                    <div className="row mt-3 rounded">
                                        <div className={`col-12`}>
                                            <LiveStreamBiddingInfoSeller
                                                ws={ws}
                                            />
                                        </div>
                                    </div>
                                    <LiveStreamControlPanelSeller
                                        isDesktop={isDesktop}
                                        isTablet={isTablet}
                                        ws={ws}
                                    />
                                </>
                            )}
                            {page === 3 && (
                                <LiveStreamChatRoom
                                    liveStreamRef={liveStreamRef}
                                    isTablet={isTablet}
                                />
                            )}
                            {page === 4 && <LiveStreamRecommendSeller />}
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
                                <LiveStreamRecommendSeller />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LiveStream;
