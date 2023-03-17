import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { StoreFavouriteItem } from "./StoreFavouriteItem";

export function Favourites() {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  const [favouriteItems, setFavouriteItems] = useState<any[]>([]);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/favouriteList/getFavouriteList/${email}`,
        config
      )
      .then((response) => {
        console.log(response.data);
        setFavouriteItems(response.data);
      });
  }, []);
  const DisplayData = favouriteItems.map((favouriteItem) => {
    return (
      <tr>
        <td>
          <StoreFavouriteItem {...favouriteItem} />
        </td>
      </tr>
    );
  });

  return (
    <Container>
      <table className="table">
        <tbody className="ShowDogs">{DisplayData}</tbody>
      </table>
    </Container>
  );
}
