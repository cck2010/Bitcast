import { Button, Card, Container, Image } from "react-bootstrap";
import lihkg_logo from "../homepage/lihkg_logo.png";

export function MyLiveProducts() {
  return (
    <div>
      <Container className="my_live_container pt-3">
          <h2>我的直播</h2>
        <Card className="card_body" style={{ width: "16rem" }}>
          <Image className="my_live_products" src={lihkg_logo} fluid />
          <Card.Body>
            <Card.Title>Name</Card.Title>
            <Card.Text>Live starting time</Card.Text>
            <Button variant="outline-dark" className="bid_button">
              開始直播
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
