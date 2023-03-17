import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { StoreCartItem } from "./StoreCartItem";
import { Button } from "@mui/material";

export function Cart() {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  const [cartItems, setCartItems] = useState<any[]>([]);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/cartList/getCartList/${email}`,
        config
      )
      .then((response) => {
        console.log(response.data);
        setCartItems(response.data);
      });
  }, []);
  const DisplayData = cartItems.map((cartItem) => {
    return (
      <tr>
        <td>
          <StoreCartItem {...cartItem} />
        </td>
      </tr>
    );
  });

  return (
    <Container>
      <table className="table">
        <tbody className="ShowDogs">{DisplayData}</tbody>
      </table><br/><br/>
      <Button color="warning" variant="contained" href="/order">Proceed to Buy</Button>
    </Container>
  );
}