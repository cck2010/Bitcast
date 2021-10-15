import React, { useState } from "react";

function LiveStreamBiddingInfoSeller() {
    const [inputRemainingTime, setInputRemainingTime] = useState<number>(2);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [currentPrice, setCurrentPrice] = useState<number>(100);
    const [isBidding, setIsBidding] = useState<boolean>(false);

    return (
        <div className="LiveStreamBiddingInfoSeller h-100 rounded">
            <div className="row h-100">
                <div className="info col-6 d-flex flex-column justify-content-center align-items-center h-100">
                    <div className="current_price mb-2">
                        現在價格:
                        <br /> <i className="fas fa-money-bill-wave"></i>
                        {"  "}${currentPrice}
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
                    <button
                        className={`start_auction btn btn-primary mb-3 w-75 ${
                            isBidding && "unavailable_btn"
                        }`}
                        onClick={() => {
                            setRemainingTime(inputRemainingTime * 60);
                            setIsBidding(true);
                        }}
                    >
                        開始拍賣
                    </button>
                    <label>
                        <span className="mt-3">設定倒數時間(分鐘):</span>
                        <input
                            type="number"
                            className="action_duration w-75"
                            max={5}
                            min={1}
                            value={inputRemainingTime}
                            onChange={(e) =>
                                setInputRemainingTime(parseInt(e.target.value))
                            }
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}

export default LiveStreamBiddingInfoSeller;
