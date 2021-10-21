import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    fetchProductTime,
    LiveStreamProduct,
    LiveStreamProductDynamicInfo,
} from "../../redux/LiveStream/actions";
import { RootState } from "../../store";

function LiveStreamBiddingInfo() {
    const [inputRemainingTime, setInputRemainingTime] = useState<number>(2);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [currentPrice, setCurrentPrice] = useState<number>(100);
    const [currentProductId, setCurrentProductId] = useState<number>(-1);
    const [isBidding, setIsBidding] = useState<boolean>(false);
    const [highestBidUser, setHighestBidUser] = useState<string>("");

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

    console.log(selectedProductDynamic);

    return (
        <div className="LiveStreamBiddingInfo h-100 rounded">
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
                {
                    <>
                        <button
                            disabled={isBidding}
                            className={`start_auction btn btn-primary my-3 me-3 w-100 ${
                                isBidding && "unavailable_btn"
                            }`}
                            onClick={() => {
                                fetchProductTime(
                                    currentProductId,
                                    inputRemainingTime
                                );
                                setRemainingTime(inputRemainingTime);
                                setIsBidding(true);
                            }}
                        >
                            <i className="fas fa-gavel"></i> 開始拍賣
                        </button>
                        <label>
                            <span className="input_duration mt-3 me-3">
                                倒數時間(秒):
                            </span>
                            <input
                                type="number"
                                className="action_duration w-100"
                                max={300}
                                min={60}
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
        // <div className="LiveStreamBiddingInfo h-100 rounded p-3">
        //     <div className="row h-100">
        //         <div className="info col-6 d-flex flex-column justify-content-center align-items-center h-100">
        //             <div className="current_price">
        //                 現在價格:
        //                 <br /> <i className="fas fa-money-bill-wave"></i>
        //                 {"  "}${currentPrice}
        //                 <br />
        //                 <span className="highest_bid_user mb-3">
        //                     叫價者:{" "}
        //                     {highestBidUser === ""
        //                         ? "暫時未有叫價"
        //                         : highestBidUser}
        //                 </span>
        //             </div>
        //             {remainingTime === 0 ? (
        //                 <div className="remaining_time mt-2">拍賣尚未開始</div>
        //             ) : (
        //                 <div className="remaining_time mt-2">
        //                     <i className="fas fa-hourglass-half"></i>
        //                     {""}剩餘 {remainingTime} 秒
        //                 </div>
        //             )}
        //         </div>
        //         <div className="input col-6 d-flex flex-column justify-content-center h-100 px-3">
        //             {
        //                 <>
        //                     <button
        //                         disabled={isBidding}
        //                         className={`start_auction btn btn-primary mb-3 me-3 w-100 ${
        //                             isBidding && "unavailable_btn"
        //                         }`}
        //                         onClick={() => {
        //                             fetchProductTime(
        //                                 currentProductId,
        //                                 inputRemainingTime
        //                             );
        //                             setRemainingTime(inputRemainingTime);
        //                             setIsBidding(true);
        //                         }}
        //                     >
        //                         <i className="fas fa-gavel"></i> 開始拍賣
        //                     </button>
        //                     <label>
        //                         <span className="input_duration mt-3 me-3">
        //                             倒數時間(秒):
        //                         </span>
        //                         <input
        //                             type="number"
        //                             className="action_duration w-100"
        //                             max={300}
        //                             min={60}
        //                             value={inputRemainingTime}
        //                             onChange={(e) =>
        //                                 setInputRemainingTime(
        //                                     parseInt(e.target.value)
        //                                 )
        //                             }
        //                         />
        //                     </label>
        //                 </>
        //             }
        //         </div>
        //     </div>
        // </div>
    );
}

export default LiveStreamBiddingInfo;
