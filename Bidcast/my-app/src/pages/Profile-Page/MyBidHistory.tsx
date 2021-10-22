import { Button, Card, Container, Image } from "react-bootstrap";

export function MyBidHistory() {
  return (
    <div>
      <Container>
        <h2 className="pt-3">拍賣紀錄</h2>
      </Container>
      <Container className="my_live_container pt-3">
        <Card className="card_body" style={{ width: "16rem" }}>
          <Image
            className="my_live_products"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/258px-Great_Wave_off_Kanagawa2.jpg"
            fluid
          />
          <Card.Body>
            <Card.Title>Name</Card.Title>
            <Card.Text>Live starting time</Card.Text>
            <Button variant="outline-danger" className="broadcasting_button">
              直播中
            </Button>
          </Card.Body>
        </Card>
        <Card className="card_body" style={{ width: "16rem" }}>
          <Image
            className="my_live_products"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/258px-Great_Wave_off_Kanagawa2.jpg"
            fluid
          />
          <Card.Body>
            <Card.Title>Name</Card.Title>
            <Card.Text>Live starting time</Card.Text>
            <Button variant="outline-dark" className="bid_button" disabled>
              拍賣結束
            </Button>
          </Card.Body>
        </Card>

        <Card>
            <Image
              className="my_live_products"
              src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MX3Y2?wid=2104&hei=2980&fmt=jpeg&qlt=95&.v=1580420157712"
              fluid
            />
            <Card.Body>
              <div className="counter">
                <div className="countdown_time">
                  <div className="time_value">00</div>
                  <div className="time_label">日</div>
                </div>
                <div className="countdown_time">
                  <div className="time_value">00</div>
                  <div className="time_label">時</div>
                </div>
                <div className="countdown_time">
                  <div className="time_value">00</div>
                  <div className="time_label">分</div>
                </div>
                <div className="countdown_time">
                  <div className="time_value">00</div>
                  <div className="time_label">秒</div>
                </div>
              </div>
              <Card.Title>產品名</Card.Title>
              <Card.Text>
                底價: <span className="biding_price">HKD 100</span>
              </Card.Text>
              <Card.Text>由xxx主辦</Card.Text>
              <Button variant="outline-dark" className="bid_button">
                收藏
              </Button>
            </Card.Body>
          </Card>
      </Container>
    </div>
  );
}
