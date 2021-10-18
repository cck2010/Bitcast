import { Button, Container, Nav } from "react-bootstrap";
import bidcast_logo from "./bidcast_logo.png";

export function Footer() {
  return (
    <footer>
      <Container>
        <div className="logo_and_getStarted">
          <img
            alt="bidcast_logo"
            src={bidcast_logo}
            width="100"
            height="50"
            className="d-inline-block align-top"
          />
          <div>
            <span className="get_started">想拍賣嘢？</span>
            <Button variant="success" className="get_started_button">
              㩒呢度
            </Button>
          </div>
        </div>
        <div className="footer_links">
          <Nav.Link href="#">產品</Nav.Link>
          <Nav.Link href="#">拍賣嘢</Nav.Link>
          <Nav.Link href="#">登入 ／ 註冊</Nav.Link>
        </div>
        <span className="copyright">
          Copyright © 2021 Bidcast All Rights Reserved.
        </span>
      </Container>
    </footer>
  );
}
