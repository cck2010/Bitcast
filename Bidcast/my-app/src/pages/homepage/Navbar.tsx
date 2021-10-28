import {
    Nav,
    Navbar,
    NavDropdown,
    Popover,
    OverlayTrigger,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homepage.scss";
import bidcast_logo from "./bidcast_logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import React, { useEffect } from "react";
import { checkCurrentUser, logoutThunk } from "../../redux/user/actions";
import { push } from "connected-react-router";
import { FormGroup, Input } from "reactstrap";
import {
    fetchFilteredCategories,
    fetchProductSearchResult,
} from "../../redux/searchResult/action";
import { fetchCategories } from "../../redux/products/actions";
import { menuIconClick } from "../../redux/Sidebar/actions";

export function HomePageNavbar() {
    // const [show, setShow] = useState(false);
    // const showDropdown = () => {
    //   setShow(!show);
    // };
    // const hideDropdown = () => {
    //   setShow(false);
    // };

    const dispatch = useDispatch();
    const isAuthenticate = useSelector(
        (state: RootState) => state.user.isAuthenticate
    );
    const profilePic = useSelector((state: RootState) => {
        if (
            typeof state.authState.user !== "string" &&
            state.authState.user?.profile_pic
        ) {
            return state.authState.user.profile_pic;
        }
        return "360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg";
    });
    const phoneNumber = useSelector((state: RootState) => {
        if (
            typeof state.authState.user !== "string" &&
            state.authState.user?.phone_number
        ) {
            return state.authState.user?.phone_number;
        }
        return "";
    });

    useEffect(() => {
        dispatch(checkCurrentUser());
    }, [dispatch]);

    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        dispatch(fetchProductSearchResult(searchInput));
    }, [dispatch, searchInput]);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">請先登入</Popover.Header>
        </Popover>
    );

    const categories = useSelector((state: RootState) =>
        Object.values(state.products.categories)
    );

    useEffect(() => {
        // fetch ser 拎 categories data
        dispatch(fetchCategories());
    }, [dispatch]);

    const menuIconOnclickHandler = () => {
        dispatch(menuIconClick(true));
    };

    const [categoryId, setCategoryId] = useState(0);

    useEffect(() => {
        dispatch(fetchFilteredCategories(categoryId));
    }, [dispatch, categoryId]);

    return (
        <div>
            <Navbar collapseOnSelect expand="md" className="navbar py-0">
                <Link to="/" className="nav_link ms-3 mt-2 mt-md-0">
                    <img
                        alt="bidcast_logo"
                        src={bidcast_logo}
                        height="40"
                        className="d-inline-block align-top"
                    />
                </Link>
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={menuIconOnclickHandler}
                />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto navbar_buttons">
                        <FormGroup>
                            <Input
                                type="search"
                                name="search"
                                id="exampleSearch"
                                placeholder="搜尋..."
                                onChange={(event) => {
                                    setSearchInput(event.target.value);
                                }}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        dispatch(
                                            push(
                                                `/searchResult?SearchingKeywords=${searchInput}`
                                            )
                                        );
                                    }
                                }}
                            />
                        </FormGroup>
                        <Link to="/" className="nav_link">
                            主頁
                        </Link>

                        {!isAuthenticate ? (
                            <OverlayTrigger
                                trigger="click"
                                placement="bottom"
                                overlay={popover}
                            >
                                <Link to="#" className="nav_link">
                                    舉辦拍賣
                                </Link>
                            </OverlayTrigger>
                        ) : (
                            <Link
                                to={
                                    phoneNumber == "" ||
                                    phoneNumber == "11111111"
                                        ? "/profilePage/accountDetails"
                                        : "/createBids"
                                }
                                className="nav_link"
                            >
                                舉辦拍賣
                            </Link>
                        )}

                        <NavDropdown
                            title="商品分類"
                            id="collasible-nav-dropdown"
                            className="dropdown"
                            // show={show}
                            // onMouseEnter={showDropdown}
                            // onMouseLeave={hideDropdown}
                        >
                            {categories.map((category) => (
                                <Link
                                    to={`/categoryResult?category=${category.category}`}
                                    className="dropdown_items"
                                    key={category.id}
                                    onClick={() => setCategoryId(category.id)}
                                >
                                    {category.category}
                                </Link>
                            ))}
                        </NavDropdown>
                        {!isAuthenticate ? (
                            <Link to="/loginPage" className="nav_link">
                                登入 ／ 註冊
                            </Link>
                        ) : (
                            <Link
                                to="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(logoutThunk());
                                    dispatch(push("/"));
                                }}
                                className="nav_link"
                            >
                                登出
                            </Link>
                        )}
                        <Link
                            to="/profilePage/accountDetails"
                            className="nav_link mb-md-0 mb-3 me-0 me-md-3"
                        >
                            {isAuthenticate && profilePic && (
                                <img
                                    alt="profile_pic"
                                    src={`${
                                        profilePic.search(
                                            /(https:\/\/)|(http:\/\/)/i
                                        ) < 0
                                            ? process.env
                                                  .REACT_APP_BACKEND_URL +
                                              "/" +
                                              profilePic
                                            : profilePic
                                    }`}
                                    width="40"
                                    height="40"
                                    className="rounded-circle"
                                />
                            )}
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
