import { Card, Col, Image, Row } from "react-bootstrap";
import lihkg_logo from "../homepage/lihkg_logo.png";

export function AccountDetails() {
  return (
    <div>
      <Row>
        <Col xs={12} md={8}>

        </Col>
        <Col xs={6} md={4}>
          <Card className="card_body" style={{ width: "18rem" }}>
            <div className="card_bg_color"></div>
            <Image src={lihkg_logo} width="80" height="80" roundedCircle className="profile_logo" />
            <Card.Body>
              <Card.Title>Name</Card.Title>
              <Card.Text>phone no</Card.Text>
              <Card.Text>email</Card.Text>
              <Card.Text>telegram_account</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
