import React from "react";
import "./LiveStream.scss";
import LiveStreamWindow from "../../component/LiveStream/LiveStreamWindow";
import LiveStreamControlPanel from "../../component/LiveStream/LiveStreamControlPanel";
import LiveStreamChatRoom from "../../component/LiveStream/LiveStreamChatRoom";
import LiveStreamRecommend from "../../component/LiveStream/LiveStreamRecommend";
import LiveStreamHeader from "../../component/LiveStream/LiveStreamHeader";

function LiveStream() {
    return (
        <div className="LiveStream m-3">
            <div className="row">
                <div className="col-8">
                    <LiveStreamWindow></LiveStreamWindow>
                    <LiveStreamHeader></LiveStreamHeader>
                    <LiveStreamControlPanel></LiveStreamControlPanel>
                </div>
                <div className="col-4">
                    <LiveStreamChatRoom></LiveStreamChatRoom>
                </div>
            </div>
            <div className="row">
                <LiveStreamRecommend></LiveStreamRecommend>
            </div>
        </div>
    );
}

export default LiveStream;
