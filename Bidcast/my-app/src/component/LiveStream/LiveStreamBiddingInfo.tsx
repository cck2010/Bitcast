import React, { useState, useEffect } from "react";

function LiveStreamBiddingInfo() {
    const [inputRemainingTime, setInputRemainingTime] = useState<number>(2);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [increment, setIncrement] = useState<number>(10);
    const [currentPrice, setCurrentPrice] = useState<number>(100);
    const [inputPrice, setInputPrice] = useState<number>(currentPrice);
    const [isBidding, setIsBidding] = useState<boolean>(true);
    const [isSeller, setIsSeller] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    useEffect(() => {
        if (inputPrice <= currentPrice) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [inputPrice, currentPrice]);

    return (
        <div className="LiveStreamBiddingInfo h-100 rounded p-3">
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
                    {isSeller ? (
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
                                <span className="mt-3">
                                    設定倒數時間(分鐘):
                                </span>
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
                    ) : (
                        <>
                            <button
                                disabled={!isBidding}
                                className={`min_bid btn btn-danger w-75 ${
                                    !isBidding && "unavailable_btn"
                                }`}
                                onClick={() => {
                                    setCurrentPrice(currentPrice + increment);
                                }}
                            >
                                <i className="fas fa-gavel"></i> 最低叫價
                            </button>
                            <button
                                disabled={!isBidding || isDisabled}
                                className={`custom_bid btn btn-primary mb-3 w-75 ${
                                    (!isBidding || isDisabled) &&
                                    "unavailable_btn"
                                }`}
                                onClick={() => {
                                    setCurrentPrice(inputPrice);
                                    setInputPrice(inputPrice + increment);
                                }}
                            >
                                <i className="fas fa-gavel"></i> 自訂叫價
                            </button>
                            <label>
                                <span className="mt-3">
                                    (一口叫價為${increment})
                                </span>
                                <input
                                    type="number"
                                    className="action_duration w-75"
                                    value={inputPrice}
                                    onChange={(e) => {
                                        setInputPrice(parseInt(e.target.value));
                                    }}
                                />
                            </label>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LiveStreamBiddingInfo;
