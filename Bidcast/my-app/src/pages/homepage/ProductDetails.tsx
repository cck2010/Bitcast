import { useEffect, useState } from "react";
import { Button, Modal, Image, Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../redux/homepage/action";
import { RootState } from "../../store";

const productResponsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export function ProductDetails(props: any) {
  const products = useSelector((state: RootState) =>
    Object.values(state.comingAuction.productDetails)
  );

  console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetails());
  }, [dispatch]);

  const { lives } = props;
  const [liveArr, setLiveArr] = useState([]);

  useEffect(() => {
    setLiveArr(lives.filter((live: any) => live.id === props.id));
  }, []);

  if (!lives) {
    return <div></div>;
  }

  return (
    <div>
      {liveArr.length === 1 && (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          key={(liveArr[0] as any).id}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {(liveArr[0] as any).title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>拍賣時間： {(liveArr[0] as any).starting_time}</h4>
            <Container>
              <Row>
                <Col xs={6} md={4}>
                  <Carousel
                    additionalTransfrom={0}
                    autoPlay={false}
                    arrows
                    // autoPlaySpeed={5000}
                    centerMode={false}
                    className=""
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={90}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={productResponsive}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                  >
                    {products.map(
                      (product) =>
                        product.live_id === (liveArr[0] as any).id && (
                          <div className="product_details_container">
                            <Image
                              key={product.id}
                              src={`${process.env.REACT_APP_BACKEND_URL}/${product.product_image}`}
                              fluid
                            />
                            <div>商品名稱： {product.product_name}</div>
                            <div>底價： {product.min_price}</div>
                            <div>即買價： {product.buy_price}</div>
                          </div>
                        )
                    )}
                  </Carousel>
                </Col>
                <Col xs={12} md={8}>
                  <div className="products_info_container">
                    <div className="products_detailed_info">
                      <p>拍賣簡介： {(liveArr[0] as any).description}</p>

                      <div>
                        <p>
                          拍賣商品數量：
                          {
                            products.filter(
                              (product) =>
                                product.live_id === (liveArr[0] as any).id
                            ).length
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
