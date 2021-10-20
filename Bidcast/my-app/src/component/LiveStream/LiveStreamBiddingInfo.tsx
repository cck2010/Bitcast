import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchBidIncrement,
    LiveStreamProduct,
} from "../../redux/LiveStream/actions";
import { RootState } from "../../store";

function LiveStreamBiddingInfo() {
    const dispatch = useDispatch();

    const [remainingTime, setRemainingTime] = useState<number>(0);
    // const [increment, setIncrement] = useState<number>(10);
    // const [currentPrice, setCurrentPrice] = useState<number>(100);
    const [inputPrice, setInputPrice] = useState<number>(0);
    const [isBidding, setIsBidding] = useState<boolean>(true);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    // const [highestBidUser, setHighestBidUser] = useState<string>("");
    const username = "測試員";
    // let products: any = [];
    const products = useSelector(
        (state: RootState) =>
            state.liveStream.liveStreamProducts.liveStreamProductsArr
    );

    const [selectedProduct, setSelectedProduct] = useState<LiveStreamProduct>({
        id: 0,
        productName: "string",
        minPrice: 0,
        currentPrice: 0,
        buyPrice: 0,
        bidIncrement: 0,
        buyer: "string",
        productImage: "string",
        isSelected: false,
        countdownStartTime: new Date(),
        duration: 0,
        isEnded: false,
        success: false,
    });

    useEffect(() => {
        if (products.length !== 0) {
            for (let product of products) {
                if (product.isSelected && !product.isEnded) {
                    setSelectedProduct(product);
                    break;
                }
            }
        }
    }, [products]);
    console.log(products);

    useEffect(() => {
        if (
            inputPrice <=
            selectedProduct.currentPrice + selectedProduct.bidIncrement - 1
        ) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [
        inputPrice,
        selectedProduct.currentPrice,
        selectedProduct.bidIncrement,
    ]);

    return (
        <div className="LiveStreamBiddingInfo h-100 rounded p-3">
            <div className="row h-100">
                <div className="info col-4 d-flex flex-column justify-content-center align-items-center h-100">
                    <div className="current_price">
                        現在價格:
                        <br /> <i className="fas fa-money-bill-wave"></i>
                        {"  "}${selectedProduct.currentPrice}
                        <br />
                        <span className="highest_bid_user mb-3">
                            叫價者:{" "}
                            {selectedProduct.buyer != null &&
                            selectedProduct.buyer === ""
                                ? "暫時未有叫價"
                                : selectedProduct.buyer}
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
                <div className="input col-8 d-flex flex-column justify-content-center h-100 px-2">
                    {
                        <div className="row g-0">
                            <div className="col-8">
                                <button
                                    disabled={!isBidding}
                                    className={`min_bid btn btn-danger mb-1 w-100 ${
                                        !isBidding && "unavailable_btn"
                                    }`}
                                    onClick={() => {
                                        dispatch(
                                            fetchBidIncrement(
                                                selectedProduct.id
                                            )
                                        );
                                    }}
                                >
                                    <i className="fas fa-gavel"></i> 最低叫價
                                </button>
                                <button
                                    disabled={!isBidding || isDisabled}
                                    className={`custom_bid btn btn-primary mb-1 w-100 ${
                                        (!isBidding || isDisabled) &&
                                        "unavailable_btn"
                                    }`}
                                    onClick={() => {}}
                                >
                                    <i className="fas fa-gavel"></i> 自訂叫價
                                    <br />
                                    (一口叫價為${selectedProduct.bidIncrement})
                                </button>
                                <label className="w-100">
                                    <input
                                        type="number"
                                        className="action_duration w-100"
                                        value={inputPrice}
                                        onChange={(e) => {
                                            setInputPrice(
                                                parseInt(e.target.value)
                                            );
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="col-4">
                                <button
                                    disabled={!isBidding}
                                    className={`custom_bid btn btn-success mx-1 w-100 h-100 ${
                                        !isBidding && "unavailable_btn"
                                    }`}
                                    onClick={() => {}}
                                >
                                    <i className="fas fa-gavel"></i> 即買價
                                    <br />
                                    (${selectedProduct.bidIncrement})
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default LiveStreamBiddingInfo;
