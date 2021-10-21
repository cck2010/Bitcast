import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Image,
} from "react-bootstrap";
import "./CategoryResult.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";

export function CategoryResults() {
  return (
    <div className="category_page">
      <Container>
        <ButtonGroup aria-label="Basic example" className="pt-3 button_group">
          <div>
            <FontAwesomeIcon icon={faSlidersH} className="filter_icon" />
            篩選器：{" "}
          </div>
          <DropdownButton
            as={ButtonGroup}
            title="拍賣日期"
            id="bg-nested-dropdown"
          >
            <Dropdown.Item eventKey="1">由新至舊</Dropdown.Item>
            <Dropdown.Item eventKey="2">由舊至新</Dropdown.Item>
          </DropdownButton>
          <DropdownButton as={ButtonGroup} title="底價" id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1">由高至低</Dropdown.Item>
            <Dropdown.Item eventKey="2">由低至高</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
        <hr />

        <div className="category_items_container">
          <Image
            src="https://i.picsum.photos/id/5/200/200.jpg?hmac=oN9VtXdJYLSFssji8vCr48JaI-e5Zi4eH9GAiYBB_Ig"
            fluid
          />
          <div className="description_container">
            <h3>Name</h3>
            <h6>Auction date</h6>
            <h6>posted by</h6>
            <p>description</p>
          </div>
        </div>
        <div className="category_items_container">
          <Image
            src="https://i.picsum.photos/id/5/200/200.jpg?hmac=oN9VtXdJYLSFssji8vCr48JaI-e5Zi4eH9GAiYBB_Ig"
            fluid
          />
          <div className="description_container">
            <h3>Name</h3>
            <h6>Auction date</h6>
            <h6>posted by</h6>
            <p>description</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
