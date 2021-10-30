import { useEffect, useState } from "react";
import { Accordion, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyLiveProducts } from "../../redux/myLiveProducts/action";
import { RootState } from "../../store";
import { MyLiveProducts } from "../../redux/myLiveProducts/action";

interface MyLiveProductsProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MyLiveProductsComponent(props: MyLiveProductsProps) {
    const [loadState, setLoadState] = useState<number>(0);
    const myLiveProducts = useSelector((state: RootState) =>
        Object.values(state.myLive.myLiveProducts)
    );
    let myLiveProductsSorted: MyLiveProducts[] = myLiveProducts.sort(
        (item1, item2) => item2.id - item1.id
    );
    let myLiveProductsArr: MyLiveProducts[][] = [];
    let ind = 0;

    while (ind < myLiveProductsSorted.length) {
        if (myLiveProductsArr.length === 0) {
            myLiveProductsArr.push([]);
            if (myLiveProductsSorted[ind] !== undefined) {
                myLiveProductsArr[0].push(myLiveProductsSorted[ind]);
                ind++;
            }
        } else {
            if (
                myLiveProductsArr[myLiveProductsArr.length - 1][0].id &&
                myLiveProductsSorted[ind].id ===
                    myLiveProductsArr[myLiveProductsArr.length - 1][0].id
            ) {
                myLiveProductsArr[myLiveProductsArr.length - 1].push(
                    myLiveProductsSorted[ind]
                );
                ind++;
            } else {
                myLiveProductsArr.push([]);
                myLiveProductsArr[myLiveProductsArr.length - 1].push(
                    myLiveProductsSorted[ind]
                );
                ind++;
            }
        }
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (loadState === 0) {
            props.setIsLoading(true);
        }
    }, [loadState, props]);
    useEffect(() => {
        dispatch(fetchMyLiveProducts(props.setIsLoading, setLoadState));
    }, [dispatch, props]);

    const user = useSelector((state: RootState) => state.authState.user);
    const userInfo = JSON.parse(JSON.stringify(user));

    return (
        <div>
            <Container>
                <h2 className="pt-3">我拍賣的商品</h2>
            </Container>
            <Container className="my_live_container pt-3">
                {/* <Card
                    className="my_live_product_card_body"
                    style={{ width: "16rem" }}
                >
                    <Image
                        className="my_live_products"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/258px-Great_Wave_off_Kanagawa2.jpg"
                        fluid
                    />
                    <Card.Body className="my_bid_card_container">
                        <Card.Title>Name</Card.Title>
                        <Card.Text>Live starting time</Card.Text>
                        <Card.Text>Current price</Card.Text>
                        <Card.Text>seller email</Card.Text>
                        <Card.Text>seller phone</Card.Text>
                        <Card.Text>Hosted by</Card.Text>
                        <Button variant="outline-danger">直播中</Button>
                    </Card.Body>
                </Card>
                <Card
                    className="my_live_product_card_body"
                    style={{ width: "16rem" }}
                >
                    <Image
                        className="my_live_products"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/258px-Great_Wave_off_Kanagawa2.jpg"
                        fluid
                    />
                    <Card.Body className="my_bid_card_container">
                        <Card.Title>Name</Card.Title>
                        <Card.Text>Live starting time</Card.Text>
                        <Card.Text>deal price</Card.Text>
                        <Card.Text>hosted by</Card.Text>
                        <Button variant="outline-dark" disabled>
                            拍賣結束
                        </Button>
                    </Card.Body>
                </Card> */}

                <Accordion defaultActiveKey="0" flush>
                    {myLiveProductsArr.map(
                        (myLiveProductArr, index) =>
                            myLiveProductArr[0].seller_id === userInfo.id && (
                                <Accordion.Item
                                    eventKey={`${index}`}
                                    key={myLiveProductArr[0].id}
                                >
                                    <Accordion.Header>
                                        直播名稱： {myLiveProductArr[0].title}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Table responsive="md">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>商品名稱</th>
                                                    <th>底價</th>
                                                    <th>即買價</th>
                                                    <th>每次叫價</th>
                                                    <th>拍賣成功／尚未賣出</th>
                                                </tr>
                                            </thead>
                                            {myLiveProductArr.map(
                                                (product, index) => (
                                                    <tbody key={product.id}>
                                                        <tr>
                                                            <td>{`${
                                                                index + 1
                                                            }`}</td>
                                                            <td>
                                                                {
                                                                    product.product_name
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    product.min_price
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    product.buy_price
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    product.bid_increment
                                                                }
                                                            </td>
                                                            {product.buyer_id ===
                                                            null ? (
                                                                <td>
                                                                    尚未賣出
                                                                </td>
                                                            ) : (
                                                                <td>
                                                                    拍賣成功
                                                                </td>
                                                            )}
                                                        </tr>
                                                    </tbody>
                                                )
                                            )}
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                    )}
                </Accordion>
            </Container>
        </div>
    );
}
