import { Button, Card, Container, Image } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { SvgBorder } from "./SvgBorder";
import { RWebShare } from "react-web-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getComingAuctions } from "../../redux/homepage/action";
import { useEffect } from "react";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 2, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export function ComingAuction() {
  const auctions = useSelector((state: RootState) =>
    Object.values(state.comingAuction.comingAuctions.comingAuctionsArr)
  );

  console.log(auctions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComingAuctions());
  }, [dispatch]);

  return (
    <div>
      <Container>
        <h4 className="Incoming_auction">最新拍賣</h4>
        <SvgBorder />
        <Carousel
          additionalTransfrom={0}
          autoPlay
          arrows={false}
          autoPlaySpeed={5000}
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
          responsive={responsive}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable={false}
        >
          {auctions.map((auction) => (
            <Card key={auction.id} className="product_card">
              <Image
                key={auction.id}
                className="img_fluid"
                src={auction.productImage}
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
                <Card.Title>{auction.productName}</Card.Title>
                <Card.Text>
                  起價:{" "}
                  <span className="biding_price">HKD {auction.minPrice}</span>
                </Card.Text>
                <div className="bid_share_container">
                  <Button variant="outline-dark" className="bid_button">
                    收藏
                  </Button>

                  <RWebShare
                    data={{
                      text: "",
                      url: "",
                      title: "Look at this amazing live",
                    }}
                    onClick={() => console.log("shared successfully!")}
                  >
                    <FontAwesomeIcon
                      className="share_icon"
                      icon={faExternalLinkAlt}
                    />
                  </RWebShare>
                </div>
              </Card.Body>
            </Card>
          ))}

          <Card className="product_card">
            <Image
              className="img_fluid"
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
                起價: <span className="biding_price">HKD 100</span>
              </Card.Text>
              <Button variant="outline-dark" className="bid_button">
                收藏
              </Button>
            </Card.Body>
          </Card>
        </Carousel>
      </Container>
    </div>
  );
}
