import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-tiny-slider";
import { TinySliderInstance } from "tiny-slider";
import {
    fetchSelectedProduct,
    LiveStreamProduct,
    loadLiveStreamProducts,
} from "../../redux/LiveStream/actions";
import { RootState } from "../../store";
import LiveStreamBiddingInfoSeller from "./LiveStreamBiddingInfoSeller";
import { Socket } from "socket.io-client";
import LiveStreamDescription from "./LiveStreamDescription";

interface LiveStreamControlPanelProps {
    isDesktop: boolean;
    isTablet: boolean;
    ws: Socket | null;
}

function LiveStreamControlPanel(props: LiveStreamControlPanelProps) {
    const carousel = useRef<TinySliderInstance>(null);

    const goNextSlide = (dir: "next" | "prev") =>
        carousel.current != null && carousel.current.goTo(dir);

    const liveStreamControlPanelDesktopSetting = { maxHeight: "600px" };

    const dispatch = useDispatch();

    const products = useSelector(
        (state: RootState) =>
            state.liveStream.liveStreamProducts.liveStreamProductsArr
    );

    const liveId = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.id
    );

    return (
        <div className="LiveStreamControlPanel rounded">
            <div
                className="row g-0 panel_bar"
                style={
                    props.isDesktop ? {} : liveStreamControlPanelDesktopSetting
                }
            >
                <div
                    className={`col-12 d-flex d-col carousel position-relative`}
                >
                    <Carousel
                        swipeAngle={false}
                        items={1}
                        ref={carousel}
                        controls={false}
                        nav={false}
                        onClick={(slideIndex, info, event) => {
                            let newProducts: LiveStreamProduct[] = [];
                            for (let product of products) {
                                let newProduct = { ...product };
                                newProducts.push(newProduct);
                            }
                            if (slideIndex == null) {
                                return;
                            }
                            let ind = parseInt(
                                info.slideItems
                                    .item(slideIndex)
                                    .ariaLabel.split("card")
                                    .join("")
                            );
                            newProducts = newProducts.concat(
                                newProducts.splice(0, info.displayIndex - 1)
                            );
                            let productId = -1;
                            for (let i = 0; i < newProducts.length; i++) {
                                if (ind === newProducts[i].id) {
                                    newProducts[i].isSelected = true;
                                    productId = newProducts[i].id;
                                } else {
                                    newProducts[i].isSelected = false;
                                }
                            }

                            dispatch(fetchSelectedProduct(productId));
                            dispatch(loadLiveStreamProducts(newProducts, true));
                            if (props.ws) {
                                props.ws.emit("render", [liveId, productId]);
                            }
                        }}
                    >
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className={`carousel_card ${
                                    product.isSelected ? "selected" : ""
                                } d-flex align-items-center justify-content-between`}
                                aria-label={`card${product.id}`}
                            >
                                <img
                                    key={product.id}
                                    className={`carousel_img ${
                                        product.isEnded ? "sold " : ""
                                    } ${
                                        product.isSelected ? "selected" : ""
                                    } ms-3`}
                                    src={product.productImage}
                                    alt={`pic${product.id}`}
                                />
                                <div className="product_info mh-100 d-flex flex-column justify-content-center align-items-start">
                                    <div className="product_name">
                                        <i className="fas fa-gift"></i>{" "}
                                        競價項目:
                                        <br />
                                        {product.productName}
                                    </div>
                                    <div className="product_price">
                                        <i className="fas fa-chart-line"></i>{" "}
                                        起標價:
                                        <br />${product.minPrice}
                                    </div>
                                </div>
                                <LiveStreamDescription
                                    description={
                                        product.description
                                            ? product.description
                                            : ""
                                    }
                                />
                            </div>
                        ))}
                    </Carousel>

                    <button
                        className="btn btn-secondary carousel_btn carousel_btn_left"
                        onClick={() => goNextSlide("prev")}
                    >
                        <i className="fas fa-caret-left"></i>
                    </button>
                    <button
                        className="btn btn-secondary carousel_btn carousel_btn_right"
                        onClick={() => goNextSlide("next")}
                    >
                        <i className="fas fa-caret-right"></i>
                    </button>
                </div>
            </div>
            <div className="row mt-3 rounded">
                <div className={`col-12`}>
                    <LiveStreamBiddingInfoSeller />
                </div>
            </div>
        </div>
    );
}

export default LiveStreamControlPanel;
