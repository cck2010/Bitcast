import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import {
    fetchliveStreamProducts,
    fetchProductTime,
    LiveStreamProduct,
    LiveStreamProductDynamicInfo,
} from "../../redux/LiveStream/actions";
import { RootState } from "../../store";

interface LiveStreamBiddingInfoProps {
    ws: Socket | null;
}

function LiveStreamBiddingInfo(props: LiveStreamBiddingInfoProps) {
    const dispatch = useDispatch();
    const [inputRemainingTime, setInputRemainingTime] = useState<number>(60);
    const [remainingTime, setRemainingTime] = useState<number>(Infinity);
    const [isBidding, setIsBidding] = useState<boolean>(false);
    const [timerId, setTimerId] = useState<number>(0);

    const liveId = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.id
    );

    const products = useSelector(
        (state: RootState) =>
            state.liveStream.liveStreamProducts.liveStreamProductsArr
    );

    const productsDynamic = useSelector(
        (state: RootState) =>
            state.liveStream.liveStreamProducts.liveStreamProductsArrDynamic
    );

    const [selectedProduct, setSelectedProduct] = useState<LiveStreamProduct>({
        id: 0,
        productName: "",
        minPrice: 0,
        buyPrice: 0,
        bidIncrement: 0,
        productImage: "",
        description: "",
        success: false,
    });

    const [selectedProductDynamic, setSelectedProductDynamic] =
        useState<LiveStreamProductDynamicInfo>({
            id: 0,
            currentPrice: 0,
            isSelected: false,
            buyer: "",
            duration: 0,
            success: false,
        });

    useEffect(() => {
        return () => {
            if (remainingTime <= 0) {
                clearInterval(timerId);
                setIsBidding(false);
            }
        };
    }, [remainingTime, timerId]);

    useEffect(() => {
        if (productsDynamic.length !== 0) {
            for (let ind in productsDynamic) {
                let countdownEndTime = productsDynamic[ind].countdownEndTime;
                if (
                    productsDynamic[ind].isSelected &&
                    countdownEndTime !== undefined &&
                    countdownEndTime > new Date()
                ) {
                    setSelectedProduct(products[ind]);
                    setSelectedProductDynamic(productsDynamic[ind]);
                    setIsBidding(true);
                    setRemainingTime(
                        Math.ceil(
                            (countdownEndTime!.getTime() -
                                new Date().getTime()) /
                                1000
                        )
                    );
                    if (timerId === 0) {
                        setTimerId(
                            window.setInterval(() => {
                                setRemainingTime(
                                    Math.ceil(
                                        (countdownEndTime!.getTime() -
                                            new Date().getTime()) /
                                            1000
                                    )
                                );
                            }, 16)
                        );
                    }
                    break;
                } else if (
                    productsDynamic[ind].isSelected &&
                    countdownEndTime !== undefined &&
                    countdownEndTime <= new Date()
                ) {
                    clearInterval(timerId);
                    setSelectedProduct(products[ind]);
                    setSelectedProductDynamic(productsDynamic[ind]);
                    setIsBidding(false);
                } else if (
                    productsDynamic[ind].isSelected &&
                    countdownEndTime === undefined
                ) {
                    clearInterval(timerId);
                    setSelectedProduct(products[ind]);
                    setSelectedProductDynamic(productsDynamic[ind]);
                    setIsBidding(false);
                }
            }
        }
    }, [products, productsDynamic, timerId]);

    useEffect(() => {
        if (props.ws) {
            props.ws.on(
                "updateCurrentPrice",
                (liveId: number, isEnded: boolean) => {
                    dispatch(fetchliveStreamProducts(liveId, false));
                    if (isEnded) {
                        setRemainingTime(-100);
                    }
                }
            );
        }
    }, [dispatch, props.ws]);

    return (
        <div className="LiveStreamBiddingInfo h-100 rounded my-3">
            <div className="info w-100 h-100 d-flex justify-contens-center align-items-center flex-column">
                <div className="row">
                    <div className="col-12 d-flex flex-row justify-content-center align-items-center w-100 h-100 mt-3">
                        <img
                            key={selectedProduct.id}
                            className={`selected_img me-4`}
                            src={selectedProduct.productImage}
                            alt={`pic${selectedProduct.id}`}
                        />
                        <div className="instant_info d-flex flex-column">
                            <div className="current_price ms-4">
                                <i className="fas fa-money-bill-wave"></i>{" "}
                                現在價格:
                                <br /> ${selectedProductDynamic.currentPrice}
                                <br />
                                <span className="highest_bid_user mb-3">
                                    最高出價者:{" "}
                                    {selectedProductDynamic.buyer == null ||
                                    selectedProductDynamic.buyer === ""
                                        ? "暫時未有叫價"
                                        : selectedProductDynamic.buyer}
                                </span>
                            </div>
                            {!isBidding &&
                            selectedProductDynamic.countdownEndTime ===
                                undefined ? (
                                <div className="remaining_time mt-2 ms-4">
                                    拍賣尚未開始
                                </div>
                            ) : !isBidding &&
                              selectedProductDynamic.countdownEndTime !==
                                  undefined ? (
                                <div className="remaining_time mt-2 ms-4">
                                    拍賣已結束
                                </div>
                            ) : (
                                <div className="remaining_time mt-2 ms-4 text-center">
                                    <i className="fas fa-hourglass-half"></i>
                                    {""}剩餘 {remainingTime} 秒
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <button
                    disabled={
                        isBidding ||
                        (!isBidding &&
                            selectedProductDynamic.countdownEndTime !==
                                undefined)
                    }
                    className={`start_auction btn btn-primary my-3 w-100 ${
                        isBidding && "unavailable_btn"
                    }`}
                    onClick={() => {
                        setRemainingTime(inputRemainingTime);
                        if (props.ws) {
                            dispatch(
                                fetchProductTime(
                                    selectedProduct.id,
                                    inputRemainingTime,
                                    setTimerId,
                                    props.ws,
                                    liveId
                                )
                            );
                        }
                    }}
                >
                    <i className="fas fa-gavel"></i> 開始拍賣
                </button>
                <label className="w-100 d-flex justify-content-between align-items-center">
                    <span className="input_duration ">倒數時間(秒):</span>
                    <input
                        type="number"
                        className="action_duration w-75 text-end"
                        max={300}
                        min={60}
                        value={inputRemainingTime}
                        onChange={(e) =>
                            setInputRemainingTime(parseInt(e.target.value))
                        }
                    />
                </label>
            </div>
        </div>
    );
}

export default LiveStreamBiddingInfo;
