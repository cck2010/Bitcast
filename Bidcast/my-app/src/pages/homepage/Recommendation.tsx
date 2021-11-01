import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
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
                                    <Card.Title>電腦、平板與周邊</Card.Title>
                                    <Card.Text>更多精選電玩產品</Card.Text>
                                    <Link to={`/categoryResult?category=`}>
                                        <Card.Text className="view_more">
                                            查看更多
                                        </Card.Text>
                                    </Link>
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
                                    <Card.Title>原創設計</Card.Title>
                                    <Card.Text>拍賣主自家設計產品</Card.Text>
                                    <Link to={`/categoryResult?category=`}>
                                        <Card.Text className="view_more">
                                            查看更多
                                        </Card.Text>
                                    </Link>
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
                                    <Card.Title>運動、戶外與休閒</Card.Title>
                                    <Card.Text>絕版波鞋，簽名波衫</Card.Text>
                                    <Link to={`/categoryResult?category=`}>
                                        <Card.Text className="view_more">
                                            查看更多
                                        </Card.Text>
                                    </Link>
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
                                    <Card.Title>古董、藝術與礦石</Card.Title>
                                    <Card.Text>
                                        搜羅稀世古董，奇珍異石
                                    </Card.Text>
                                    <Link to={`/categoryResult?category=`}>
                                        <Card.Text className="view_more">
                                            查看更多
                                        </Card.Text>
                                    </Link>
                                </Card.ImgOverlay>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
