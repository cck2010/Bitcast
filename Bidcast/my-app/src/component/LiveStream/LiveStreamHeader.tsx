import React from "react";

function LiveStreamHeader() {
    return (
        <div className="LiveStreamHeader px-3">
            <div className="mainInfo">
                <div className="title my-3">拍賣會Test場</div>
                <div className="userinfo d-flex align-items-center mb-4">
                    <img
                        className="profilePic rounded-circle"
                        src="https://img.tw.observer/images/vS4jQ2W.jpg"
                        alt="profilePic"
                    />
                    <div className="username mx-3">胡迪</div>
                </div>
                <div className="viewers">
                    正在觀看人數: {100} <i className="fas fa-user-friends"></i>
                </div>
            </div>
        </div>
    );
}

export default LiveStreamHeader;
