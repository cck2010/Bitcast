import { Button, Container } from "react-bootstrap";
import bidcast_logo from "./bidcast_logo.png";
import { Link } from "react-router-dom";

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
            <span className="get_started">想成為拍賣主？</span>
            <Button variant="success" className="get_started_button">
              按這裏
            </Button>
          </div>
        </div>
        <div className="footer_links">
          <Link to="/" className="nav_link">產品</Link>
          <Link to="/" className="nav_link">拍賣</Link>
          <Link to="/" className="nav_link">登入 ／ 註冊</Link>
        </div>
        <span className="copyright">
          Copyright © 2021 Bidcast All Rights Reserved.
        </span>
      </Container>
    </footer>
  );
}
