import moment from "moment";
import { useEffect } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyLiveProducts } from "../../redux/myLiveProducts/action";
import { RootState } from "../../store";

export function MyBidHistory() {
    const myBidHistories = useSelector((state: RootState) =>
        Object.values(state.myLive.myLiveProducts)
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMyLiveProducts());
    }, [dispatch]);

    const user = useSelector((state: RootState) => state.authState.user);
    const userInfo = JSON.parse(JSON.stringify(user));

    return (
        <div>
            <Container>
                <h2 className="pt-3">成功投到的商品</h2>
            </Container>
            <Container className="my_live_container pt-3">
                {myBidHistories.map(
                    (myBidHistory) =>
                        myBidHistory.buyer_id !== null &&
                        myBidHistory.buyer_id === userInfo.id && (
                            <Card
                                className="my_live_product_card_body"
                                style={{ width: "16rem" }}
                                key={myBidHistory.id}
                            >
                                <Image
                                    className="my_live_products"
                                    src={myBidHistory.product_image}
                                    fluid
                                />
                                <Card.Body className="my_bid_card_container">
                                    <Card.Title>
                                        產品名稱： {myBidHistory.product_name}
                                    </Card.Title>
                                    <Card.Text>
                                        拍賣日期：{" "}
                                        {moment(
                                            myBidHistory.starting_time
                                        ).format("YYYY-MM-DD")}
                                    </Card.Text>
                                    <Card.Text>
                                        成交價格： {myBidHistory.deal_price}
                                    </Card.Text>
                                    <Card.Text>
                                        賣家電郵： {myBidHistory.email}
                                    </Card.Text>
                                    <Card.Text>
                                        賣家電話： {myBidHistory.phone_number}
                                    </Card.Text>
                                    <Card.Text>
                                        由 {myBidHistory.username} 主辦
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                )}
            </Container>
        </div>
    );
}
