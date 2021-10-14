import React, { useRef, useState } from "react";
import Carousel from "react-tiny-slider";
import { TinySliderInstance } from "tiny-slider";

function LiveStreamControlPanel() {
    const carousel = useRef<TinySliderInstance>(null);

    const goNextSlide = (dir: "next" | "prev") =>
        carousel.current != null && carousel.current.goTo(dir);

    interface Product {
        id: number;
        src: string;
        isSold: boolean;
        isSelected: boolean;
    }

    const [products, setProducts] = useState<Product[]>([
        {
            id: 0,
            src: "https://cdn.shopify.com/s/files/1/0339/7091/3412/products/POPMARTWinniethePooh.jpg",
            isSold: false,
            isSelected: false,
        },
        {
            id: 1,
            src: "https://lumiere-a.akamaihd.net/v1/images/c94eed56a5e84479a2939c9172434567c0147d4f.jpeg",
            isSold: false,
            isSelected: false,
        },
        {
            id: 2,
            src: "https://winniethepoohshow.com/assets/img/WTP-PoohHoneypot-Placeholder.png",
            isSold: false,
            isSelected: false,
        },
        {
            id: 3,
            src: "https://www.rd.com/wp-content/uploads/2020/01/shutterstock_247528582-2-copy-scaled.jpg",
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
                        items={3}
                        ref={carousel}
                        controls={false}
                        nav={false}
                        onClick={(slideIndex, info, event) => {
                            let newProducts = [...products];
                            if (slideIndex == null) {
                                return;
                            }
                            let ind = parseInt(
                                info.slideItems[slideIndex].alt
                                    .split("pic")
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
                            <img
                                key={product.id}
                                className={`carousel_img ${
                                    product.isSold ? "sold " : ""
                                } ${product.isSelected ? "selected" : ""}`}
                                src={product.src}
                                alt={`pic${product.id}`}
                            />
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
                <div className="col-6">Control Panel</div>
            </div>
        </div>
    );
}

export default LiveStreamControlPanel;
