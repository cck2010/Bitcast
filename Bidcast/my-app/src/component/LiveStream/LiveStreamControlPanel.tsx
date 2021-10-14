import React, { useRef, useState } from "react";
import Carousel from "react-tiny-slider";
import { TinySliderInstance } from "tiny-slider";
import LiveStreamBiddingInfoSeller from "./LiveStreamBiddingInfoSeller";

function LiveStreamControlPanel() {
    const carousel = useRef<TinySliderInstance>(null);

    const goNextSlide = (dir: "next" | "prev") =>
        carousel.current != null && carousel.current.goTo(dir);

    interface Product {
        id: number;
        src: string;
        name: string;
        price: number;
        isSold: boolean;
        isSelected: boolean;
    }

    const [products, setProducts] = useState<Product[]>([
        {
            id: 0,
            src: "https://cdn.shopify.com/s/files/1/0339/7091/3412/products/POPMARTWinniethePooh.jpg",
            name: "pooh1",
            price: 10,
            isSold: false,
            isSelected: false,
        },
        {
            id: 1,
            src: "https://lumiere-a.akamaihd.net/v1/images/c94eed56a5e84479a2939c9172434567c0147d4f.jpeg",
            name: "pooh2",
            price: 20,
            isSold: false,
            isSelected: false,
        },
        {
            id: 2,
            src: "https://winniethepoohshow.com/assets/img/WTP-PoohHoneypot-Placeholder.png",
            name: "pooh3",
            price: 30,
            isSold: false,
            isSelected: false,
        },
        {
            id: 3,
            src: "https://www.rd.com/wp-content/uploads/2020/01/shutterstock_247528582-2-copy-scaled.jpg",
            name: "pooh4",
            price: 40,
            isSold: false,
            isSelected: false,
        },
    ]);

    return (
        <div className="LiveStreamControlPanel">
            <div className="row">
                <div className="col-6 d-flex d-col carousel">
                    <Carousel
                        swipeAngle={false}
                        items={1}
                        ref={carousel}
                        controls={false}
                        nav={false}
                        onClick={(slideIndex, info, event) => {
                            let newProducts = [...products];
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
                            for (let i = 0; i < newProducts.length; i++) {
                                if (ind === newProducts[i].id) {
                                    newProducts[i].isSelected = true;
                                } else {
                                    newProducts[i].isSelected = false;
                                }
                            }
                            setProducts(newProducts);
                        }}
                    >
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className={`carousel_card`}
                                aria-label={`card${product.id}`}
                            >
                                <img
                                    key={product.id}
                                    className={`carousel_img ${
                                        product.isSold ? "sold " : ""
                                    } ${product.isSelected ? "selected" : ""}`}
                                    src={product.src}
                                    alt={`pic${product.id}`}
                                />
                                <div className="product_info">
                                    <div className="product_name">
                                        競價項目:
                                        <br />
                                        {product.name}
                                    </div>
                                    <div className="product_price">
                                        起標價:
                                        <br />${product.price}
                                    </div>
                                </div>
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
                <div className="col-6">
                    <LiveStreamBiddingInfoSeller></LiveStreamBiddingInfoSeller>
                </div>
            </div>
        </div>
    );
}

export default LiveStreamControlPanel;
