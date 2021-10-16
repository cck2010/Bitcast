import React, { useRef } from "react";
import "./LiveStream.scss";
import LiveStreamWindow from "../../component/LiveStream/LiveStreamWindow";
import LiveStreamControlPanel from "../../component/LiveStream/LiveStreamControlPanel";
import LiveStreamChatRoom from "../../component/LiveStream/LiveStreamChatRoom";
import LiveStreamRecommend from "../../component/LiveStream/LiveStreamRecommend";
import LiveStreamDescription from "../../component/LiveStream/LiveStreamDescription";
import LiveStreamHeader from "../../component/LiveStream/LiveStreamHeader";

function LiveStream() {
    const liveStreamRef = useRef<HTMLDivElement>(null);
    return (
        <div className="LiveStream m-3" ref={liveStreamRef}>
            <div className="row">
                <div className="col-8">
                    <LiveStreamWindow />
                    <LiveStreamHeader />
                    <LiveStreamControlPanel />
                    <LiveStreamDescription />
                </div>
                <div className="col-4">
                    <div className="row">
                        <div className="col">
                            <LiveStreamChatRoom liveStreamRef={liveStreamRef} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <LiveStreamRecommend />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LiveStream;
