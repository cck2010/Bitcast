import React, { useState } from "react";

function LiveStreamBiddingInfo() {
    const [inputRemainingTime, setInputRemainingTime] = useState<number>(2);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [currentPrice, setCurrentPrice] = useState<number>(100);
    const [isBidding, setIsBidding] = useState<boolean>(true);
    const [highestBidUser, setHighestBidUser] = useState<string>("");

    return (
        <div className="LiveStreamBiddingInfo h-100 rounded p-3">
            <div className="row h-100">
                <div className="info col-6 d-flex flex-column justify-content-center align-items-center h-100">
                    <div className="current_price">
                        現在價格:
                        <br /> <i className="fas fa-money-bill-wave"></i>
                        {"  "}${currentPrice}
                        <br />
                        <span className="highest_bid_user mb-3">
                            叫價者:{" "}
                            {highestBidUser === ""
                                ? "暫時未有叫價"
                                : highestBidUser}
                        </span>
                    </div>
                    {remainingTime === 0 ? (
                        <div className="remaining_time mt-2">拍賣尚未開始</div>
                    ) : (
                        <div className="remaining_time mt-2">
                            <i className="fas fa-hourglass-half"></i>
                            {""}剩餘 {remainingTime} 秒
                        </div>
                    )}
                </div>
                <div className="input col-6 d-flex flex-column justify-content-center h-100 px-2">
                    {
                        <>
                            <button
                                disabled={isBidding}
                                className={`start_auction btn btn-primary mb-3 w-75 ${
                                    isBidding && "unavailable_btn"
                                }`}
                                onClick={() => {
                                    setRemainingTime(inputRemainingTime * 60);
                                    setIsBidding(true);
                                }}
                            >
                                <i className="fas fa-gavel"></i> 開始拍賣
                            </button>
                            <label>
                                <span className="mt-3">倒數時間(分鐘):</span>
                                <input
                                    type="number"
                                    className="action_duration w-75"
                                    max={5}
                                    min={1}
                                    value={inputRemainingTime}
                                    onChange={(e) =>
                                        setInputRemainingTime(
                                            parseInt(e.target.value)
                                        )
                                    }
                                />
                            </label>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default LiveStreamBiddingInfo;
