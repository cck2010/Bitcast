import { Button, Card, Container, Image } from "react-bootstrap";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { fetchMyLive } from "../../redux/myLiveProducts/action";
import moment from "moment";
import "./Animation.scss";

export function MyLive() {
    const dispatch = useDispatch();

    const lives = useSelector((state: RootState) =>
        Object.values(state.myLive.myLive)
    );

    const user = useSelector((state: RootState) => state.authState.user);
    const userInfo = JSON.parse(JSON.stringify(user));

    useEffect(() => {
        dispatch(fetchMyLive());
    }, [dispatch]);

    return (
        <div className="myLive ps-3">
            <Container>
                <h2 className="pt-3">我的直播</h2>
            </Container>
            <Container className="my_live_container pt-3">
                {lives.map((live) =>
                    live.user_id === userInfo.id ? (
                        <Card
                            key={live.id}
                            className="my_live_product_card_body"
                            style={{ width: "16rem" }}
                        >
                            <Image
                                className="my_live_products"
                                src={`${process.env.REACT_APP_BACKEND_URL}/${live.image}`}
                                fluid
                            />
                            <Card.Body className="my_bid_card_container">
                                <Card.Title>{live.title}</Card.Title>
                                <Card.Text>
                                    {moment(live.starting_time).format(
                                        "YYYY-MM-DD hh:mm:ss"
                                    )}
                                </Card.Text>

                                {live.is_ended ? (
                                    <div>
                                        <Card.Text>
                                            觀看人數： {live.max_viewer}
                                        </Card.Text>
                                        <Button
                                            variant="outline-dark"
                                            className="bid_button"
                                            disabled
                                        >
                                            直播完結
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <Button
                                            variant="outline-dark"
                                            className="bid_button"
                                            onClick={() => {
                                                dispatch(
                                                    push(
                                                        `/liveStreamingSeller?token=${live.seller_link}`
                                                    )
                                                );
                                            }}
                                        >
                                            開始直播
                                        </Button>
                                        <Button
                                            variant="outline-dark"
                                            className="bid_button"
                                        >
                                            完成直播
                                        </Button>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    ) : (
                        " "
                    )
                )}

                <Card
                    className="my_live_product_card_body"
                    style={{ width: "16rem" }}
                >
                    <Image
                        className="my_live_products"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOKWyupCA7IZfNCTrogofaPnaClmqOly430g&usqp=CAU"
                        fluid
                    />
                    <Card.Body className="my_bid_card_container">
                        <Card.Title>Name</Card.Title>
                        <Card.Text>Live starting time</Card.Text>
                        <Card.Text>max viewers</Card.Text>
                        <Button
                            variant="outline-dark"
                            className="bid_button"
                            disabled
                        >
                            直播完結
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
