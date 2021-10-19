import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function LiveStreamHeader() {
    const title = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.title
    );
    const seller = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.seller
    );
    const sellerImage = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.sellerImage
    );
    const currentViewers = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.currentViewers
    );
    const description = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.description
    );

    return (
        <div className="LiveStreamHeader px-3">
            <div className="mainInfo">
                <div className="title my-3">{title}</div>
                <div className="userinfo d-flex align-items-center mb-4">
                    <img
                        className="profilePic rounded-circle"
                        src={sellerImage}
                        alt="profilePic"
                    />
                    <div className="username mx-3">{seller}</div>
                    <div className="viewers">
                        正在觀看人數: {currentViewers}{" "}
                        <i className="fas fa-user-friends"></i>
                    </div>
                </div>
                <div className="description m-3 mb-5">{description}</div>
            </div>
        </div>
    );
}

export default LiveStreamHeader;
