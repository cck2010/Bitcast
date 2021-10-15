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
            <span className="get_started">Ready to get started?</span>
            <Button variant="success" className="get_started_button">
              Get Started
            </Button>
          </div>
        </div>
        <div className="footer_links">
          <Nav.Link href="#">About Us</Nav.Link>
          <Nav.Link href="#">Created Bid</Nav.Link>
          <Nav.Link href="#">Profile Page</Nav.Link>
        </div>
        <span className="copyright">
          Copyright © 2021 Bidcast All Rights Reserved.
        </span>
      </Container>
    </footer>
  );
}
