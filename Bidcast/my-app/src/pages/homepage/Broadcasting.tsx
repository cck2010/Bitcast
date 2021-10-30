import { Button, Card, Container, Image } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { SvgBorder } from "./SvgBorder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExternalLinkAlt,
    faPodcast,
} from "@fortawesome/free-solid-svg-icons";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { RWebShare } from "react-web-share";
import { RootState } from "../../store";
import { useEffect } from "react";
import { fetchBroadcastingProducts } from "../../redux/broadcastingProducts/actions";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
};

export function Broadcasting() {
    const dispatch = useDispatch();
    const broadcastings = useSelector((state: RootState) =>
        Object.values(state.broadcastingProducts.broadcastingProduct)
    );

    useEffect(() => {
        dispatch(fetchBroadcastingProducts());
    }, [dispatch]);

    return (
        <div>
            <Container>
                <h4 className="Incoming_auction">直播中</h4>
                <SvgBorder />
                <Carousel
                    additionalTransfrom={0}
                    arrows={false}
                    autoPlay
                    autoPlaySpeed={5000}
                    centerMode={false}
                    className=""
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={90}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={responsive}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {broadcastings.map((broadcasting) => (
                        <div key={broadcasting.id}>
                            <Card className="product_card">
                                <div className="img_icon_container">
                                    <Image
                                        className="img_fluid"
                                        src={`${process.env.REACT_APP_BACKEND_URL}/${broadcasting.image}`}
                                        fluid
                                    />
                                    <FontAwesomeIcon
                                        className="podcast_icon"
                                        icon={faPodcast}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title className="broadcasting_title">
                                        {broadcasting.title}
                                    </Card.Title>
                                    <Card.Text>
                                        目前價格:{" "}
                                        <span className="biding_price">
                                            HKD {broadcasting.current_price}
                                        </span>
                                    </Card.Text>
                                    <Card.Text>
                                        由{broadcasting.username}主辦
                                    </Card.Text>
                                    <div className="bid_share_container">
                                        <Button
                                            variant="outline-dark"
                                            className="bid_button"
                                            onClick={() => {
                                                dispatch(
                                                    push(
                                                        `/liveStreaming?room=${broadcasting.buyer_link}`
                                                    )
                                                );
                                            }}
                                        >
                                            觀看直播
                                        </Button>

                                        <RWebShare
                                            data={{
                                                text: "",
                                                url: "",
                                                title: "Look at this amazing live",
                                            }}
                                            onClick={() =>
                                                console.log(
                                                    "shared successfully!"
                                                )
                                            }
                                        >
                                            <FontAwesomeIcon
                                                className="share_icon"
                                                icon={faExternalLinkAlt}
                                            />
                                        </RWebShare>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Carousel>
            </Container>
        </div>
    );
}
