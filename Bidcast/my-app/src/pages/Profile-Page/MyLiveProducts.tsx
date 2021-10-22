import { Button, Card, Container, Image } from "react-bootstrap";
import lihkg_logo from "../homepage/lihkg_logo.png";

export function MyLiveProducts() {
  return (
    <div>
      <Card className="card_body" style={{ width: "18rem" }}>
            <Image src={lihkg_logo} fluid/>
            <Card.Body>
              <Card.Title>Name</Card.Title>
              <Card.Text>phone no</Card.Text>
              <Card.Text>email</Card.Text>
              <Button variant="outline-dark" className="bid_button">
                開始直播
              </Button>
            </Card.Body>
          </Card>
    </div>
  );
}
