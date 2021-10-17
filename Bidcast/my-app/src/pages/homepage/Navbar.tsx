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
// import { Homepage } from "./Homepage";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-solid-svg-icons";

export function HomePageNavbar() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="navbar">
                <Container className="logo_container">
                    <Navbar.Brand href="#home">
                        <img
                            alt="bidcast_logo"
                            src={bidcast_logo}
                            width="90"
                            height="45"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <div className="buttons_container">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="搵下直播"
                                className="me-2 search_bar"
                                aria-label="Search"
                            />
                        </Form>

                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto navbar_buttons">
                                <Nav.Link href="#">產品</Nav.Link>
                                <Nav.Link href="/createBids">拍賣嘢</Nav.Link>
                                <Nav.Link href="/liveStreaming">
                                    直播頁面
                                </Nav.Link>
                                <NavDropdown
                                    title="商品分類"
                                    id="collasible-nav-dropdown"
                                >
                                    <NavDropdown.Item href="#">
                                        商品分類1
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#">
                                        商品分類2
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#">
                                        商品分類3
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#">登入 ／ 註冊</Nav.Link>
                                {/* <Nav.Link href="#">
                <FontAwesomeIcon icon={faBell} />
              </Nav.Link> */}
                            </Nav>
                        </Navbar.Collapse>
                        <Nav.Link href="#">
                            <Image
                                src={lihkg_logo}
                                width="40"
                                height="40"
                                roundedCircle
                            />
                        </Nav.Link>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
}
