import {
    ButtonGroup,
    Container,
    Dropdown,
    DropdownButton,
    Image,
    Col,
} from "react-bootstrap";
import "./CategoryResult.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import moment from "moment";
import { Link } from "react-router-dom";
import { useState } from "react";

export function SearchResults() {
    const searchingResults = useSelector(
        (state: RootState) => state.searchProduct.productList
    );

    const [sortingMethod, setSortingMethod] = useState("2");

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
                            onClick={() => setSortingMethod("2")}
                        >
                            由遠至近
                        </Dropdown.Item>
                        <Dropdown.Item
                            eventKey="2"
                            onClick={() => {
                                setSortingMethod("1");
                            }}
                        >
                            由近至遠
                        </Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        as={ButtonGroup}
                        title="底價"
                        id="bg-nested-dropdown"
                    >
                        <Dropdown.Item
                            eventKey="3"
                            onClick={() => {
                                setSortingMethod("4");
                            }}
                        >
                            由高至低
                        </Dropdown.Item>
                        <Dropdown.Item
                            eventKey="4"
                            onClick={() => {
                                setSortingMethod("3");
                            }}
                        >
                            由低至高
                        </Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
                <hr />

                {searchingResults &&
                    (sortingMethod === "1"
                        ? [...searchingResults].sort((a, b) => {
                              if (
                                  new Date(Date.parse(a.starting_time)) >
                                  new Date(Date.parse(b.starting_time))
                              ) {
                                  return 1;
                              }
                              if (
                                  new Date(Date.parse(a.starting_time)) <
                                  new Date(Date.parse(b.starting_time))
                              ) {
                                  return -1;
                              }
                              return 0;
                          })
                        : sortingMethod === "2"
                        ? [...searchingResults].sort((a, b) => {
                              if (
                                  new Date(Date.parse(a.starting_time)) >
                                  new Date(Date.parse(b.starting_time))
                              ) {
                                  return -1;
                              }
                              if (
                                  new Date(Date.parse(a.starting_time)) <
                                  new Date(Date.parse(b.starting_time))
                              ) {
                                  return 1;
                              }
                              return 0;
                          })
                        : sortingMethod === "3"
                        ? [...searchingResults].sort((a, b) => {
                              if (a.min_price > b.min_price) {
                                  return 1;
                              }
                              if (a.min_price < b.min_price) {
                                  return -1;
                              }
                              return 0;
                          })
                        : [...searchingResults].sort((a, b) => {
                              if (a.min_price > b.min_price) {
                                  return -1;
                              }
                              if (a.min_price < b.min_price) {
                                  return 1;
                              }
                              return 0;
                          })
                    ).map((searchingResult) => (
                        <div
                            className="category_items_container pe-3"
                            key={searchingResult.id}
                        >
                            <Col
                                xs={6}
                                md={4}
                                className="category_img_container"
                            >
                                <Link
                                    to={`/liveStreaming?room=${searchingResult.buyer_link}`}
                                >
                                    <Image
                                        key={searchingResult.id}
                                        src={`${process.env.REACT_APP_BACKEND_URL}/${searchingResult.product_image}`}
                                        fluid
                                    />
                                </Link>
                            </Col>
                            <div className="description_container">
                                <Link
                                    className="product_name_link"
                                    to={`/liveStreaming?room=${searchingResult.buyer_link}`}
                                >
                                    <h3>{searchingResult.product_name}</h3>
                                </Link>
                                <h6>底價： {searchingResult.min_price}</h6>
                                <h6>即買價： {searchingResult.buy_price}</h6>
                                <h6>
                                    拍賣日期：
                                    {moment(
                                        searchingResult.starting_time
                                    ).format("YYYY-MM-DD hh:mm:ss a")}
                                </h6>
                                <h6>拍賣主： {searchingResult.username}</h6>
                                <p className="products_description">
                                    商品簡介： {searchingResult.description}
                                </p>
                            </div>
                        </div>
                    ))}
            </Container>
        </div>
    );
}
