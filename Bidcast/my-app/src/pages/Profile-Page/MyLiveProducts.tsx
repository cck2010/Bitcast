import { Button, Card, Container, Image } from "react-bootstrap";
import lihkg_logo from "../homepage/lihkg_logo.png";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

export function MyLiveProducts() {
    const dispatch = useDispatch();
  return (
    <div>
      <Container>
        <h2 className="pt-3">我的直播</h2>
      </Container>
      <Container className="my_live_container pt-3">
        <Card className="card_body" style={{ width: "16rem" }}>
          <Image className="my_live_products" src={lihkg_logo} fluid />
          <Card.Body className="my_bid_card_container">
            <Card.Title>Name</Card.Title>
            <Card.Text>Live starting time</Card.Text>
            <Button variant="outline-dark" className="bid_button" onClick={() => {
                      dispatch(push(`/liveStreamingSeller?token=`));
                    }}>
              開始直播
            </Button>
          </Card.Body>
        </Card>

        <Card className="card_body" style={{ width: "16rem" }}>
          <Image className="my_live_products" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOKWyupCA7IZfNCTrogofaPnaClmqOly430g&usqp=CAU" fluid />
          <Card.Body className="my_bid_card_container">
            <Card.Title>Name</Card.Title>
            <Card.Text>Live starting time</Card.Text>
            <Card.Text>max viewers</Card.Text>
            <Button variant="outline-dark" className="bid_button" disabled>
              直播完結
            </Button>
          </Card.Body>
        </Card>

      </Container>
    </div>
  );
}
