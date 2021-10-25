import { useEffect } from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getComingAuctions } from "../../redux/homepage/action";
import { RootState } from "../../store";

export function ProductDetails(props: any) {
  // const auctions = useSelector((state: RootState) =>
  //   Object.values(state.comingAuction.comingAuctions)
  // );

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getComingAuctions());
  // }, [dispatch]);
  return (
    <div>
      {/* {auctions.map((auction) => (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          key={auction.id}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {auction.product_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>拍賣時間： {auction.starting_time}</h4>
            <div className="products_info_container">
              <Image src={`${process.env.REACT_APP_BACKEND_URL}/${auction.image}`} fluid />
              <div className="products_detailed_info">
                <p>商品類別： {auction.category}</p>
                <p>商品簡介： {auction.description}</p>
                <p>即買價： {auction.buy_price}</p>
                <p></p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      ))} */}
      hi
    </div>
  );
}
