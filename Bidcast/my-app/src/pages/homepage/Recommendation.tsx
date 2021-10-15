import { Col, Container, Row, Image, Button, Card } from "react-bootstrap";

export function Recommendation() {
  return (
    <div>
      <Container>
        <h4>Recommendation</h4>
        <div className="svg-border">
          <svg
            width="515"
            height="25"
            viewBox="0 0 275 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="7" width="120" height="1" fill="#CCCCCC"></rect>
            <rect x="155" y="7" width="120" height="1" fill="#CCCCCC"></rect>
            <path
              d="M144.443 14.6458C144.207 14.8818 143.897 15 143.588 15C143.278 15 142.968 14.8818 142.732 14.6454L137.874 9.78689C137.517 9.43023 137.43 8.90654 137.612 8.46798L136.617 7.47264L135.242 8.84723C135.517 9.2862 135.458 9.8809 135.066 10.2714C134.614 10.7245 133.888 10.7342 133.448 10.2936L130.324 7.17126C129.883 6.73028 129.893 6.00566 130.347 5.55298C130.738 5.16122 131.332 5.10231 131.771 5.37788L135.378 1.77014C135.102 1.33158 135.161 0.737682 135.553 0.346326C136.006 -0.10676 136.73 -0.116443 137.171 0.324136L140.295 3.44732C140.736 3.8879 140.726 4.61251 140.272 5.0656C139.88 5.45736 139.287 5.51586 138.849 5.2407L137.472 6.6169L138.59 7.73449C138.945 7.69334 139.314 7.80348 139.586 8.07622L144.444 12.9347C144.916 13.4071 144.916 14.1729 144.443 14.6458Z"
              fill="#2695FF"
            ></path>
          </svg>
        </div>
        <Row>
          <Col xs={6}>
            <div className="first_category_container">
              {/* <Image
                  src="https://ibid.modeltheme.com/wp-content/uploads/2018/09/masonry-banner111-1024x466.jpg"
                  alt="Card image"
                  fluid
                />
                <div className="info_container">
                    <h3 className="category_name">Category Name</h3>
                    <p className="category_count">20 products are broadcasting</p>
                    <Button variant="outline-light">Light</Button>
                </div> */}
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
          </Col>
          <Col xs={6}>xs=6</Col>
        </Row>
      </Container>
    </div>
  );
}
