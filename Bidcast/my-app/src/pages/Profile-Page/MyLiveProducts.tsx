import { Button, Card, Container, Image } from "react-bootstrap";

export function MyLiveProducts() {
    return (
        <div>
            <Container>
                <h2 className="pt-3">已投得的商品</h2>
            </Container>
            <Container className="my_live_container pt-3">
                <Card
                    className="my_live_product_card_body"
                    style={{ width: "16rem" }}
                >
                    <Image
                        className="my_live_products"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/258px-Great_Wave_off_Kanagawa2.jpg"
                        fluid
                    />
                    <Card.Body className="my_bid_card_container">
                        <Card.Title>Name</Card.Title>
                        <Card.Text>Live starting time</Card.Text>
                        <Card.Text>Current price</Card.Text>
                        <Card.Text>seller email</Card.Text>
                        <Card.Text>seller phone</Card.Text>
                        <Card.Text>Hosted by</Card.Text>
                        <Button variant="outline-danger">直播中</Button>
                    </Card.Body>
                </Card>
                <Card
                    className="my_live_product_card_body"
                    style={{ width: "16rem" }}
                >
                    <Image
                        className="my_live_products"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/258px-Great_Wave_off_Kanagawa2.jpg"
                        fluid
                    />
                    <Card.Body className="my_bid_card_container">
                        <Card.Title>Name</Card.Title>
                        <Card.Text>Live starting time</Card.Text>
                        <Card.Text>deal price</Card.Text>
                        <Card.Text>hosted by</Card.Text>
                        <Button variant="outline-dark" disabled>
                            拍賣結束
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
