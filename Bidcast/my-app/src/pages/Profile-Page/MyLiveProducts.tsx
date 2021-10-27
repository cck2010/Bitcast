import { Button, Card, Container, Image } from "react-bootstrap";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { fetchMyLiveProducts } from "../../redux/myLiveProducts/action";
import moment from "moment";

export function MyLiveProducts() {
    const dispatch = useDispatch();

    const liveProducts = useSelector((state: RootState) =>
        Object.values(state.myLiveProduct.myLiveProducts)
    );

    const user = useSelector((state: RootState) => state.authState.user);
    const userInfo = JSON.parse(JSON.stringify(user));

    useEffect(() => {
        dispatch(fetchMyLiveProducts());
    }, [dispatch]);

    return (
        <div>
            <Container>
                <h2 className="pt-3">我的直播</h2>
            </Container>
            <Container className="my_live_container pt-3">
                {liveProducts.map((liveProduct) =>
                    liveProduct.user_id === userInfo.id ? (
                        <Card
                            key={liveProduct.id}
                            className="my_live_product_card_body"
                            style={{ width: "16rem" }}
                        >
                            <Image
                                className="my_live_products"
                                src={`${process.env.REACT_APP_BACKEND_URL}/${liveProduct.image}`}
                                fluid
                            />
                            <Card.Body className="my_bid_card_container">
                                <Card.Title>{liveProduct.title}</Card.Title>
                                <Card.Text>
                                    {moment(liveProduct.starting_time).format(
                                        "YYYY-MM-DD hh:mm:ss"
                                    )}
                                </Card.Text>

                                {liveProduct.is_ended ? (
                                    <div>
                                        <Card.Text>
                                            觀看人數： {liveProduct.max_viewer}
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
                                    <Button
                                        variant="outline-dark"
                                        className="bid_button"
                                        onClick={() => {
                                            dispatch(
                                                push(
                                                    `/liveStreamingSeller?token=${liveProduct.seller_link}`
                                                )
                                            );
                                        }}
                                    >
                                        開始直播
                                    </Button>
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
