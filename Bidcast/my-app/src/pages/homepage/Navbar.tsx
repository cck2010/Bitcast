import {
  Nav,
  Navbar,
  Image,
  NavDropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homepage.scss";
import bidcast_logo from "./bidcast_logo.png";
import lihkg_logo from "./lihkg_logo.png";
import { Link, Route, Switch } from "react-router-dom";
import { CreateBids } from "../createbids/CreateBids";
import LiveStream from "../LiveStream/LiveStream";
import { useState } from "react";
import { Homepage } from "./Homepage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import React, { useEffect } from "react";
import { checkCurrentUser, logoutThunk } from "../../redux/user/actions";
import { push } from "connected-react-router";
import { FormGroup, Input } from "reactstrap";
import { fetchProductSearchResult } from "../../redux/searchResult/action";

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

  useEffect(() => {
    dispatch(checkCurrentUser());
  }, []);

  const [searchInput, setSearchInput] = useState("");
  
  useEffect(() => {
    dispatch(fetchProductSearchResult(searchInput));
  }, [dispatch, searchInput]);

  return (
    <div>
      <Navbar collapseOnSelect expand="md" className="navbar py-0">
        <Link to="/" className="nav_link ms-3 mt-2 mt-md-0">
          <img
            alt="bidcast_logo"
            src={bidcast_logo}
            width="120"
            height="60"
            className="d-inline-block align-top"
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto navbar_buttons">
            <FormGroup>
              <Input
                type="search"
                name="search"
                id="exampleSearch"
                placeholder="search..."
                onChange={(event) => {
                  setSearchInput(event.target.value);
                  console.log(event.target.value);
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    dispatch(
                      push(`/categoryResult?keywords=${searchInput}`)
                    );
                  }
                }}
              />
            </FormGroup>
            <Link to="/" className="nav_link">
              主頁
            </Link>
            <Link to="/createBids" className="nav_link">
              拍賣
            </Link>
            <NavDropdown
              title="商品分類"
              id="collasible-nav-dropdown"
              className="dropdown"
              // show={show}
              // onMouseEnter={showDropdown}
              // onMouseLeave={hideDropdown}
            >
              <Link to="/categoryResult?id=" className="dropdown_items">
                商品分類1
              </Link>
              <Link to="/categoryResult?id=" className="dropdown_items">
                商品分類2
              </Link>
              <Link to="/categoryResult?id=" className="dropdown_items">
                商品分類3
              </Link>
            </NavDropdown>
            {!isAuthenticate && (
              <Link to="/loginPage" className="nav_link">
                登入 ／ 註冊
              </Link>
            )}
            {isAuthenticate && (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(logoutThunk());
                }}
                className="nav_link"
              >
                登出
              </a>
            )}
            <Link to="/" className="nav_link">
              <FontAwesomeIcon icon={faBell} />
            </Link>
            <Link
              to="/profilePage"
              className="nav_link mb-md-0 mb-3 me-0 me-md-3"
            >
              <Image src={lihkg_logo} width="40" height="40" roundedCircle />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
