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
import { useEffect, useState } from "react";
import { fetchBroadcastingProducts } from "../../redux/broadcastingProducts/actions";
import { ProfileDetails } from "./ProfileDetails";

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
    const userInfo = useSelector((state: RootState) =>
        Object.values(state.user)
    );

    useEffect(() => {
        dispatch(fetchBroadcastingProducts());
    }, [dispatch]);

    async function profilePreview(info: any) {
        for (let broadcasting of broadcastings) {
            if (broadcasting.id == info) {
                console.log("broadcasting", broadcasting);
                console.log("broadcasting", broadcasting.username);
                console.log("broadcasting", broadcasting.seller_id);
                setModalShow(broadcasting.seller_id);
            }
        }
    }

    const [modalShow, setModalShow] = useState(-1);

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
                                    <div className="counter">
                                        <div className="countdown_time">
                                            <div className="time_value">00</div>
                                            <div className="time_label">日</div>
                                        </div>
                                        <div className="countdown_time">
                                            <div className="time_value">00</div>
                                            <div className="time_label">時</div>
                                        </div>
                                        <div className="countdown_time">
                                            <div className="time_value">00</div>
                                            <div className="time_label">分</div>
                                        </div>
                                        <div className="countdown_time">
                                            <div className="time_value">00</div>
                                            <div className="time_label">秒</div>
                                        </div>
                                    </div>
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
                                        <div
                                            key={broadcasting.id}
                                            onClick={() => {
                                                profilePreview(broadcasting.id);
                                            }}
                                            // onClick={() =>
                                            //     setModalShow(broadcasting.id)
                                            // }
                                            className={"seller_name"}
                                        >
                                            由
                                            <span className={"card_username"}>
                                                &nbsp;{broadcasting.username}
                                                &nbsp;
                                            </span>
                                            主辦
                                        </div>
                                    </Card.Text>
                                    {modalShow === broadcasting.id && (
                                        <ProfileDetails
                                            show={broadcasting.id}
                                            broadcasts={broadcasting}
                                            id={broadcasting.id}
                                            onHide={() => setModalShow(-1)}
                                        />
                                    )}

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
