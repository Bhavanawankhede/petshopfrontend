import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../App.css";
import { useState } from "react";
import { display } from "@mui/system";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import swal from "sweetalert";

type StoreItemProps = {
  itemId: number;
  categoryName: string;
  itemName: string;
  itemPrice: number;
  itemDescription: string;
  itemImage: string;
};

export function StoreItem({
  itemId,
  categoryName,
  itemName,
  itemPrice,
  itemDescription,
  itemImage,
}: StoreItemProps) {
  const pet = {
    itemId: itemId,
    categoryName: categoryName,
    itemName: itemName,
    itemPrice: itemPrice,
    itemDescription: itemDescription,
    itemImage: itemImage,
  };

  const {
    getItemQuantity,
    increaseCartQuantity,
    wishlistIncrease,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(itemId);
  const token = localStorage.getItem("userEmail");
 

  const Style: any = {
    width: 300,
  };

  const like = 0;

  const handleFavourite = (id: any) => {
    const list = {
      id: id,
      sessionToken: token,
    };
    console.log("Favourite items");
    console.log(pet);

    axios
      .post(
        `http://localhost:8080/favouriteList/addToFavouriteList/${id}/${token}`,
        list
      )
      .then((res: { data: any }) => {
        console.log(res.data);
        swal({
          title: "Added to favourites",
          icon: "success",
          timer: 2000,
        });
      });
    wishlistIncrease(id);
  };

  const handleCart = (id: any) => {
    const list = {
      id: id,
      sessionToken: token,
    };
    console.log("Cart items");
    console.log(pet);

    axios
      .post(`http://localhost:8080/cartList/addToCartList/${id}/${token}`, list)
      .then((res: { data: any }) => {
        console.log(res.data);
        swal({
          title: "Added to cart",
          icon: "success",
          timer: 2000,
        });
      });
    increaseCartQuantity(id);
  };

  return (
    <Box className="mainContainer2">
      <Card>
        <CardMedia
          component="img"
          image={require("E:/PetShopWebsiteLatest/myfetminiprojectstuffonacer/Images/" +
            itemImage)}
          style={Style}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <div className="itemTitle">{itemName}</div>
            <div className="itemPrice">{formatCurrency(itemPrice)}</div>
            <div className="itemDescription">{itemDescription}</div>
          </Typography>
          <div className="buttonDiv">
            <div className="row">
              {like === 0 && (
                <Button
                  className="row"
                  onClick={() => handleCart(itemId)}
                  variant="contained"
                >
                  <AddShoppingCartSharpIcon
                    style={{ color: "white" }}
                  ></AddShoppingCartSharpIcon>
                </Button>
              )}
            </div>

            <div className="row">
              {like === 0 && (
                <Button
                  className="favouriteDiv"
                  onClick={() => handleFavourite(itemId)}
                  variant="text"
                  size="large"
                  color="error"
                >
                  <FavoriteIcon></FavoriteIcon>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}
