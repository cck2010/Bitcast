import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Carousel from "react-tiny-slider";
import { TinySliderInstance } from "tiny-slider";
import { RootState } from "../../store";
import LiveStreamBiddingInfo from "./LiveStreamBiddingInfo";
import { Socket } from "socket.io-client";
import LiveStreamDescription from "./LiveStreamDescription";

interface LiveStreamControlPanelProps {
    isDesktop: boolean;
    isTablet: boolean;
    ws: Socket | null;
}

function LiveStreamControlPanel(props: LiveStreamControlPanelProps) {
    const carousel = useRef<TinySliderInstance>(null);

    const goNextSlide = (dir: "next" | "prev") => {
        carousel.current != null && carousel.current.goTo(dir);
    };

    const liveStreamControlPanelDesktopSetting = { maxHeight: "600px" };

    const products = useSelector(
        (state: RootState) =>
            state.liveStream.liveStreamProducts.liveStreamProductsArr
    );

    if (props.ws) {
        props.ws.on("render", (productId: number) => {
            setTimeout(() => {
                let page: number = 0;
                let slideCollection = carousel.current?.getInfo().slideItems;
                if (slideCollection !== undefined) {
                    let slideItems = Array.from(slideCollection);
                    for (let slideItem of slideItems) {
                        if (
                            slideItem.id &&
                            productId ===
                                parseInt(
                                    slideItem.ariaLabel.split("card").join("")
                                )
                        ) {
                            page = parseInt(slideItem.id.split("item")[1]);
                        }
                    }
                }

                carousel.current != null && carousel.current.goTo(page);
            }, 600);
        });
    }

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
                    <LiveStreamBiddingInfo />
                </div>
            </div>
        </div>
    );
}

export default LiveStreamControlPanel;
