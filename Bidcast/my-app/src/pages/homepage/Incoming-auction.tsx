import { Button, Card, Container, Image } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { SvgBorder } from "./SvgBorder";
import { RWebShare } from "react-web-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

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
  const auctions = useSelector((state: RootState)=> Object.values(state.comingAuction.comingAuctions.comingAuctionsArr))

  console.log(auctions);
  
  return (
    <div>
      <Container>
        <h4 className="Incoming_auction">最新拍賣</h4>
        <SvgBorder />
        <Carousel
          additionalTransfrom={0}
          arrows
          removeArrowOnDeviceType="desktop"
          autoPlay
          autoPlaySpeed={3000}
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
          swipeable
        >
          <div>
            <Card className="product_card">
              <Image
                className="img_fluid"
                src="https://i0.wp.com/sneakerhistory.com/wp-content/uploads/2019/08/kobe-ad-mid.jpg?resize=560%2C361&ssl=1"
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
          </div>
          <div>
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
          </div>
          <div>
            <div>
              <Card className="product_card">
                <Image
                  className="img_fluid"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEnKwnSLJmecwilUvH-_80EBEGQxqmk61sLA&usqp=CAU"
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
            </div>
          </div>
          <div>
            <div>
              <Card className="product_card">
                <Image
                  className="img_fluid"
                  src="data:image/jpeg;base64,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"
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
            </div>
          </div>
        </Carousel>
      </Container>
    </div>
  );
}
