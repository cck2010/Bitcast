import {
    ButtonGroup,
    Container,
    Dropdown,
    DropdownButton,
    Image,
    Col,
} from "react-bootstrap";
import "./CategoryResult.scss";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { fetchProductsForFilter } from "../../redux/searchResult/action";
import { push } from "connected-react-router";

export function FilterProducts() {
    const dispatch = useDispatch();

    const [orderCommand, setOrderCommand] = useState(" ");

    useEffect(() => {
        dispatch(fetchProductsForFilter(orderCommand));
    }, [dispatch, orderCommand]);

    const products = useSelector((state: RootState) =>
        Object.values(state.searchProduct.productFilter)
    );

    console.log(products);

    return (
        <div className="category_page">
            <Container>
                <ButtonGroup
                    aria-label="Basic example"
                    className="pt-3 button_group"
                >
                    <div>
                        <FontAwesomeIcon
                            icon={faSlidersH}
                            className="filter_icon"
                        />
                        篩選器：{" "}
                    </div>
                    <DropdownButton
                        as={ButtonGroup}
                        title="拍賣日期"
                        id="bg-nested-dropdown"
                    >
                        <Dropdown.Item
                            eventKey="1"
                            onClick={() => {
                                setOrderCommand("DateNewToOld");
                                dispatch(
                                    push(`/filteredProducts?DateOldToNew`)
                                );
                            }}
                        >
                            由新至舊
                        </Dropdown.Item>

                        <Dropdown.Item
                            eventKey="2"
                            onClick={() => {
                                setOrderCommand("DateOldToNew");
                                dispatch(
                                    push(`/filteredProducts?DateOldToNew`)
                                );
                            }}
                        >
                            由舊至新
                        </Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        as={ButtonGroup}
                        title="底價"
                        id="bg-nested-dropdown"
                    >
                        <Dropdown.Item
                            eventKey="1"
                            onClick={() => {
                                setOrderCommand("PriceH2L");
                                dispatch(push(`/filteredProducts?PriceH2L`));
                            }}
                        >
                            由高至低
                        </Dropdown.Item>
                        <Dropdown.Item
                            eventKey="2"
                            onClick={() => {
                                setOrderCommand("PriceL2H");
                                dispatch(push(`/filteredProducts?PriceL2H`));
                            }}
                        >
                            由低至高
                        </Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
                <hr />

                {products &&
                    products.map((product) => (
                        <div
                            className="category_items_container"
                            key={product.id}
                        >
                            <Col xs={6} md={4}>
                                <Image
                                    key={product.id}
                                    src={`${process.env.REACT_APP_BACKEND_URL}/${product.product_image}`}
                                    fluid
                                />
                            </Col>
                            <div className="description_container">
                                <h3>{product.product_name}</h3>
                                <h6>底價： {product.min_price}</h6>
                                <h6>即買價： {product.buy_price}</h6>
                                <h6>
                                    拍賣日期：
                                    {moment(product.starting_time).format(
                                        "YYYY-MM-DD hh:mm:ss"
                                    )}
                                </h6>
                                <h6>拍賣主： {product.username}</h6>
                                <p className="products_description">
                                    商品簡介： {product.description}
                                </p>
                            </div>
                        </div>
                    ))}
            </Container>
        </div>
    );
}
