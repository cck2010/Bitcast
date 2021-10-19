import {
  Container,
  Form,
  FormControl,
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

export function HomePageNavbar() {
  const [show, setShow] = useState(false);
  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="md" className="navbar py-0">
        <Container className="logo_container">
          <Link to="/" className="nav_link">
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
            {/* <div className="buttons_container"> */}
              <Nav className="me-auto navbar_buttons">
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="搜尋"
                    className="me-2 search_bar"
                    aria-label="Search"
                  />
                </Form>
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
                  show={show}
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                >
                  <Link to="/" className="dropdown_items">
                    商品分類1
                  </Link>
                  <Link to="/" className="dropdown_items">
                    商品分類2
                  </Link>
                  <Link to="/" className="dropdown_items">
                    商品分類3
                  </Link>
                </NavDropdown>
                <Link to="/login" className="nav_link">
                  登入 ／ 註冊
                </Link>
                <Link to="/" className="nav_link">
                  <FontAwesomeIcon icon={faBell} />
                </Link>
                <Link to="/profilePage" className="nav_link">
                  <Image
                    src={lihkg_logo}
                    width="40"
                    height="40"
                    roundedCircle
                  />
                </Link>
              </Nav>
            {/* </div> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
