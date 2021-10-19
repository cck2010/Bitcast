import { Button, Card, Container, Image } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { SvgBorder } from "./SvgBorder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faPodcast,
} from "@fortawesome/free-solid-svg-icons";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { RWebShare } from "react-web-share";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
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

export function Broadcasting() {
  const dispatch = useDispatch();
  return (
    <div>
      <Container>
        <h4 className="Incoming_auction">直播中</h4>
        <SvgBorder />
        <Carousel
          additionalTransfrom={0}
          arrows={false}
          autoPlaySpeed={3000}
          centerMode
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={100}
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
              <div className="img_icon_container">
                <Image
                  className="img_fluid"
                  src="https://i0.wp.com/sneakerhistory.com/wp-content/uploads/2019/08/kobe-ad-mid.jpg?resize=560%2C361&ssl=1"
                  fluid
                />
                <FontAwesomeIcon className="podcast_icon" icon={faPodcast} />
              </div>
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
                  目前價格: <span className="biding_price">HKD 100</span>
                </Card.Text>
                <div className="bid_share_container">
                  <Button
                    variant="outline-dark"
                    className="bid_button"
                    onClick={() => {
                      dispatch(push(`/liveStreaming?room=`));
                    }}
                  >
                    馬上出價！
                  </Button>

                  <RWebShare
                    data={{
                      text: "Like humans, flamingos make friends for life",
                      url: "https://on.natgeo.com/2zHaNup",
                      title: "Flamingos",
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
          <div>111</div>
          <div>111</div>
          <div>111</div>
        </Carousel>
      </Container>
    </div>
  );
}
