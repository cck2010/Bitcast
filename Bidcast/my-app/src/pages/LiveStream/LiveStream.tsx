import React, { useEffect, useRef, useState } from "react";
import "./LiveStream.scss";
import LiveStreamWindow from "../../component/LiveStream/LiveStreamWindow";
import LiveStreamControlPanel from "../../component/LiveStream/LiveStreamControlPanel";
import LiveStreamChatRoom from "../../component/LiveStream/LiveStreamChatRoom";
import LiveStreamRecommend from "../../component/LiveStream/LiveStreamRecommend";
import LiveStreamDescription from "../../component/LiveStream/LiveStreamDescription";
import LiveStreamHeader from "../../component/LiveStream/LiveStreamHeader";
import { useMediaQuery } from "react-responsive";
import { Button, ButtonGroup } from "reactstrap";
import { useDispatch } from "react-redux";
import { fetchInfo } from "../../redux/LiveStream/actions";

function LiveStream() {
    const liveStreamRef = useRef<HTMLDivElement>(null);

    const isDesktop = useMediaQuery({
        query: "(min-width: 1200px)",
    });

    const isTablet = useMediaQuery({
        query: "(min-width: 768px)",
    });

    const [page, setPage] = useState<number>(1);

    const dispatch = useDispatch();

    useEffect(() => {
        let room = new URLSearchParams(window.location.search).get("room");
        room = room != null ? room : "";
        let token = new URLSearchParams(window.location.search).get("token");
        token = token != null ? token : "";

        dispatch(fetchInfo(room, token));
    }, [dispatch]);

    return (
        <div className="LiveStream m-3" ref={liveStreamRef}>
            {isTablet ? (
                <div className="row">
                    <div className="col-8">
                        <LiveStreamWindow />
                        <LiveStreamHeader />
                        <LiveStreamControlPanel
                            isDesktop={isDesktop}
                            isTablet={isTablet}
                        />
                        <LiveStreamDescription />
                    </div>
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
                </div>
            ) : (
                <>
                    <LiveStreamWindow />
                    <ButtonGroup className="w-100">
                        <Button onClick={() => setPage(1)}>直播資料</Button>
                        <Button onClick={() => setPage(2)}>拍賣設定</Button>
                        <Button onClick={() => setPage(3)}>聊天室</Button>
                        <Button onClick={() => setPage(4)}>其他拍賣直播</Button>
                    </ButtonGroup>
                    {page === 1 && <LiveStreamHeader />}
                    {page === 2 && (
                        <LiveStreamControlPanel
                            isDesktop={isDesktop}
                            isTablet={isTablet}
                        />
                    )}
                    {page === 1 && <LiveStreamDescription />}
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
    );
}

export default LiveStream;
