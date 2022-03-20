import React, { useState, useEffect } from "react";
import Axios from "axios";
import CartItem from "./CartItem";

import { random, commerce } from "faker";
import { Container, Col, Row } from "reactstrap";

const apiKey = "INSET_YOUR_KEY_HERE";

const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1";
const localurl = "https://jsonware.com/api/v1/json/acd42a04-781d-453c-9af5-7e52f2805d17"; //jsonware.com
const BuyPage = ({ addInCart }) => {
  const [product, setProduct] = useState([]);

  //   const fetchPhotos = async () => {
  //     const response = await Axios.get(url, {
  //       header: {
  //         Authorization: apiKey
  //       }
  //     });

  const fetchPhotos = async () => {
    const { data } = await Axios.get(localurl);

    const { photos } = data;

    const allProduct = photos.map(photo => ({
      smallImage: photo.src.medium,
      tinyImage: photo.src.tiny,
      productName: random.word(),    //faker
      productPrice: commerce.price(), //faker
      id: random.uuid()
    }));

    setProduct(allProduct);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Container fluid>
      <h1 className="text-success text-center">Buy Page</h1>
      <Row>
        {product.map(product => (
          <Col md={4} key={product.id}>
            <CartItem product={product} addInCart={addInCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuyPage;
