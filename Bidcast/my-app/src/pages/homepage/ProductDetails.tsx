import { useEffect } from "react";
import { Button, Modal, Image, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getComingAuctions } from "../../redux/homepage/action";
import { RootState } from "../../store";

export function ProductDetails(props: any) {
  const lives = useSelector((state: RootState) =>
    Object.values(state.comingAuction.comingAuctions)
  );

  lives.filter((live: any) => live.id === props.id);

  const liveArr = lives.filter((live: any) => live.id === props.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComingAuctions());
  }, [dispatch]);
  return (
    <div>
      {liveArr[0].id === props.id ? (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          key={liveArr[0].id}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {liveArr[0].title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>拍賣時間： {liveArr[0].starting_time}</h4>
            <Container>
              <Row>
                <Col xs={6} md={4}>
                  <Image
                    src={`${process.env.REACT_APP_BACKEND_URL}/${liveArr[0].image}`}
                    fluid
                  />
                </Col>
                <Col xs={12} md={8}>
                  <div className="products_info_container">
                    <div className="products_detailed_info">
                      <p>拍賣簡介： {liveArr[0].description}</p>
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
      ) : (
        " "
      )}
    </div>
  );
}
