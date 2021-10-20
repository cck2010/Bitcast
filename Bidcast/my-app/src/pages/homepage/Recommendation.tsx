import { Col, Container, Row, Card } from "react-bootstrap";
import { SvgBorder } from "./SvgBorder";

export function Recommendation() {
  return (
    <div>
      <Container>
        <h4>熱門產品</h4>
        <SvgBorder />
        <Row>
          <Col sm={6} className="recommendation_column">
            <div className="first_category_container">
              <Card className="bg-light text-white recommendation_card">
                <Card.Img
                  src="https://ibid.modeltheme.com/wp-content/uploads/2018/09/masonry-banner111-1024x466.jpg"
                  alt="Card image"
                />
                <Card.ImgOverlay className="info_container">
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>20 products are broadcasting</Card.Text>
                  <Card.Text className="view_more">View More</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </div>
            <div className="second_category_container">
              <Card className="bg-light text-white recommendation_card">
                <Card.Img
                  src="https://ibid.modeltheme.com/wp-content/uploads/2018/09/masonry-banner33332-1-1024x653.jpg"
                  alt="Card image"
                />
                <Card.ImgOverlay className="info_container">
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>10 products are broadcasting</Card.Text>
                  <Card.Text className="view_more">View More</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </div>
          </Col>
          <Col sm={6} className="recommendation_column">
          <div className="third_category_container">
              <Card className="bg-light text-white recommendation_card">
                <Card.Img
                  src="https://ibid.modeltheme.com/wp-content/uploads/2018/09/masonry-banner222-1-1024x653.jpg"
                  alt="Card image"
                />
                <Card.ImgOverlay className="info_container">
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>10 products are broadcasting</Card.Text>
                  <Card.Text className="view_more">View More</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </div>
          <div className="fourth_category_container">
              <Card className="bg-light text-white recommendation_card">
                <Card.Img
                  src="https://ibid.modeltheme.com/wp-content/uploads/2018/09/masonry-banner444-1-1024x466.jpg"
                  alt="Card image"
                />
                <Card.ImgOverlay className="info_container">
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>10 products are broadcasting</Card.Text>
                  <Card.Text className="view_more">View More</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
