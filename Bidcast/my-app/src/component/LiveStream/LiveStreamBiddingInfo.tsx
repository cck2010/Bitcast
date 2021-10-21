import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchBidIncrement,
    LiveStreamProduct,
    LiveStreamProductDynamicInfo,
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
            isEnded: false,
            buyer: "",
            countdownStartTime: new Date(),
            duration: 0,
            success: false,
        });

    useEffect(() => {
        if (productsDynamic.length !== 0) {
            for (let ind in productsDynamic) {
                if (
                    productsDynamic[ind].isSelected &&
                    !productsDynamic[ind].isEnded
                ) {
                    setSelectedProduct(products[ind]);
                    setSelectedProductDynamic(productsDynamic[ind]);
                    break;
                }
            }
        }
    }, [products, productsDynamic]);

    useEffect(() => {
        if (
            inputPrice <=
            selectedProductDynamic.currentPrice +
                selectedProduct.bidIncrement -
                1
        ) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [
        inputPrice,
        selectedProductDynamic.currentPrice,
        selectedProduct.bidIncrement,
    ]);

    return (
        <div className="LiveStreamBiddingInfo h-100 rounded my-3">
            <div className="info w-100 h-100">
                <div className="row">
                    <div className="col-12 d-flex flex-row justify-content-around align-items-center w-100 h-100 mt-3">
                        <img
                            key={selectedProduct.id}
                            className={`selected_img`}
                            src={selectedProduct.productImage}
                            alt={`pic${selectedProduct.id}`}
                        />
                        <div className="instant_info d-flex flex-column">
                            <div className="current_price">
                                <i className="fas fa-money-bill-wave"></i>{" "}
                                現在價格:
                                <br /> ${selectedProductDynamic.currentPrice}
                                <br />
                                <span className="highest_bid_user mb-3">
                                    叫價者:{" "}
                                    {selectedProductDynamic.buyer == null ||
                                    selectedProductDynamic.buyer === ""
                                        ? "暫時未有叫價"
                                        : selectedProductDynamic.buyer}
                                </span>
                            </div>
                            {remainingTime === 0 ? (
                                <div className="remaining_time mt-2">
                                    拍賣尚未開始
                                </div>
                            ) : (
                                <div className="remaining_time mt-2">
                                    <i className="fas fa-hourglass-half"></i>
                                    {""}剩餘 {remainingTime} 秒
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bid_btn_groups row g-0 w-100 my-3">
                    <div className="col-8">
                        <button
                            disabled={!isBidding}
                            className={`min_bid btn btn-danger mb-1 w-100 ${
                                !isBidding && "unavailable_btn"
                            }`}
                            onClick={() => {
                                dispatch(fetchBidIncrement(selectedProduct.id));
                            }}
                        >
                            <i className="fas fa-gavel"></i> 最低叫價
                        </button>
                        <button
                            disabled={!isBidding || isDisabled}
                            className={`custom_bid btn btn-primary mb-1 w-100 ${
                                (!isBidding || isDisabled) && "unavailable_btn"
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
                                    setInputPrice(parseInt(e.target.value));
                                }}
                            />
                        </label>
                    </div>
                    <div className="col-4">
                        <button
                            disabled={!isBidding}
                            className={`custom_bid btn btn-success ms-1 w-100 h-100 ${
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
            </div>
        </div>
    );
}

export default LiveStreamBiddingInfo;
