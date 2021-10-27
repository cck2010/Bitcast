import {
    ButtonGroup,
    Container,
    Dropdown,
    DropdownButton,
    Image,
    Col,
  } from "react-bootstrap";
  import "./CategoryResult.scss";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
  import { useSelector } from "react-redux";
  import { RootState } from "../../store";
  
  
  export function CategoriesFilter() {
    const filterProducts = useSelector(
      (state: RootState) => state.searchProduct.categories
    )

    console.log(filterProducts);
  
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
  
          {filterProducts.map((filterProduct) => (
            <div className="category_items_container" key={filterProduct.id}>
                <Col xs={6} md={4}>
              <Image
                key={filterProduct.id}
                src={`${process.env.REACT_APP_BACKEND_URL}/${filterProduct.product_image}`}
                fluid
              />
              </Col>
              <div className="description_container">
                <h3>{filterProduct.product_name}</h3>
                <h6>底價： {filterProduct.min_price}</h6>
                <h6>即買價： {filterProduct.buy_price}</h6>
                <h6>拍賣主： {filterProduct.username}</h6>
                <p className="products_description">商品簡介： {filterProduct.description}</p>
              </div>
            </div>
          ))}
        </Container>
      </div>
    )
  }
  