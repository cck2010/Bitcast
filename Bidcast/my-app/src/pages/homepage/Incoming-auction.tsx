import { Button, Card, Container, Image } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { SvgBorder } from "./SvgBorder";
import { RWebShare } from "react-web-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getComingAuctions } from "../../redux/homepage/action";
import { useEffect, useState } from "react";
import { ProductDetails } from "./ProductDetails";
import { fetchBroadcastingProducts } from "../../redux/broadcastingProducts/actions";
import { fetchSellerSubscribe } from "../../redux/user/actions";
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
        slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
};

interface ComingAuctionProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loadState: number;
    setLoadState: React.Dispatch<React.SetStateAction<number>>;
}

export function ComingAuction(props: ComingAuctionProps) {
    const auctions = useSelector((state: RootState) =>
        Object.values(state.comingAuction.comingAuctions)
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.loadState === 0) {
            dispatch(getComingAuctions(props.setIsLoading, props.setLoadState));
        }
    }, [dispatch, props]);

    const [modalShowProf, setModalShowProf] = useState(-1);
    const [modalShow, setModalShow] = useState(-1);

    useEffect(() => {
        dispatch(fetchBroadcastingProducts());
    }, [dispatch]);

    async function profilePreview(info: any) {
        for (let auction of auctions) {
            if (auction.id == info) {
                console.log("auction", auction);
                console.log("auction", auction.username);
                console.log("auction", auction.user_id);
                dispatch(fetchSellerSubscribe(auction.user_id));
                setModalShowProf(auction.user_id);
            }
        }
    }
    return (
        <div>
            <Container>
                <h4 className="Incoming_auction">最新拍賣</h4>
                <SvgBorder />
                <Carousel
                    additionalTransfrom={0}
                    autoPlay={false}
                    arrows={false}
                    // autoPlaySpeed={5000}
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
                    {auctions.map((auction) => (
                        <Card key={auction.id} className="product_card">
                            <Image
                                className="img_fluid"
                                src={`${process.env.REACT_APP_BACKEND_URL}/${auction.image}`}
                                fluid
                            />
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
                                    {auction.title}
                                </Card.Title>
                                <Card.Text>
                                    <div
                                        key={auction.id}
                                        onClick={() => {
                                            profilePreview(auction.id);
                                        }}
                                        // onClick={() =>
                                        //     setModalShow(broadcasting.id)
                                        // }
                                        className={"seller_name"}
                                    >
                                        由
                                        <span className={"card_username"}>
                                            &nbsp;{auction.username}
                                            &nbsp;
                                        </span>
                                        主辦
                                    </div>
                                </Card.Text>
                                {modalShowProf === auction.id && (
                                    <ProfileDetails
                                        show={auction.id}
                                        broadcasts={auction}
                                        id={auction.id}
                                        onHide={() => setModalShowProf(-1)}
                                    />
                                )}
                                <div className="bid_share_container">
                                    <Button
                                        key={auction.id}
                                        variant="outline-dark"
                                        className="bid_button"
                                        onClick={() => setModalShow(auction.id)}
                                    >
                                        更多資料
                                    </Button>

                                    {modalShow === auction.id && (
                                        <ProductDetails
                                            show={auction.id}
                                            lives={auctions}
                                            id={auction.id}
                                            onHide={() => setModalShow(-1)}
                                        />
                                    )}

                                    <RWebShare
                                        data={{
                                            text: "",
                                            url: "",
                                            title: "Look at this amazing live",
                                        }}
                                        onClick={() =>
                                            console.log("shared successfully!")
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
                    ))}
                </Carousel>
            </Container>
        </div>
    );
}
