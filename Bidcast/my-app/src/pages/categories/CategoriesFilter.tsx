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
import { Link } from "react-router-dom";

export function CategoriesFilter() {
    const filterProducts = useSelector(
        (state: RootState) => state.searchProduct.categories
    );

    const dispatch = useDispatch();

    const [orderCommand, setOrderCommand] = useState(" ");

    useEffect(() => {
        dispatch(fetchProductsForFilter(orderCommand));
    }, [dispatch, orderCommand]);

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
                                    push(`/filteredProducts?DateNewToOld`)
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

                {filterProducts &&
                    filterProducts.map((filterProduct) => (
                        <div
                            className="category_items_container"
                            key={filterProduct.id}
                        >
                            <Col
                                xs={6}
                                md={4}
                                className="category_img_container"
                            >
                                <Link
                                    to={`/liveStreaming?room=${filterProduct.buyer_link}`}
                                >
                                    <Image
                                        key={filterProduct.id}
                                        src={`${process.env.REACT_APP_BACKEND_URL}/${filterProduct.product_image}`}
                                        fluid
                                    />
                                </Link>
                            </Col>
                            <div className="description_container">
                                <Link
                                    className="product_name_link"
                                    to={`/liveStreaming?room=${filterProduct.buyer_link}`}
                                >
                                    <h3>{filterProduct.product_name}</h3>
                                </Link>
                                <h6>底價： {filterProduct.min_price}</h6>
                                <h6>即買價： {filterProduct.buy_price}</h6>
                                <h6>
                                    拍賣日期：
                                    {moment(filterProduct.starting_time).format(
                                        "YYYY-MM-DD hh:mm:ss"
                                    )}
                                </h6>
                                <h6>拍賣主： {filterProduct.username}</h6>
                                <p className="products_description">
                                    商品簡介： {filterProduct.description}
                                </p>
                            </div>
                        </div>
                    ))}
            </Container>
        </div>
    );
}
