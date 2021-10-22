import { Button, Card, Container, Image } from "react-bootstrap";

export function MyBidHistory() {
  return (
    <div>
      <Container className="my_live_container pt-3">
        <Card className="card_body" style={{ width: "16rem" }}>
          <Image className="my_live_products" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/258px-Great_Wave_off_Kanagawa2.jpg" fluid />
          <Card.Body>
            <Card.Title>Name</Card.Title>
            <Card.Text>Live starting time</Card.Text>
            <Button variant="outline-dark" className="bid_button">
              開始直播
            </Button>
          </Card.Body>
        </Card>
        <Card className="card_body" style={{ width: "16rem" }}>
          <Image className="my_live_products" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/258px-Great_Wave_off_Kanagawa2.jpg" fluid />
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
