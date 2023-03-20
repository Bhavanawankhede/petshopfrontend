import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import swal from "sweetalert";
import { useEffect, useState } from "react";

type StoreFavouriteItemProps = {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemImage: string;
  itemDescription: string;
};

export function StoreFavouriteItem({
  itemId,
  itemName,
  itemPrice,
  itemImage,
  itemDescription,
}: StoreFavouriteItemProps) {
  const token = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  const Style: any = {
    width: 300,
  };

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    wishlistDecrease,
  } = useShoppingCart();

  const like = 0;

  const quantity = getItemQuantity(itemId);
  const email = localStorage.getItem("userEmail");

  const removeFavourite = (itemId: any) => {
    axios
      .get(
        `http://localhost:8080/favouriteList/getFavouriteItemIdFromItemId/${itemId}`,
        config
      )
      .then((response) => {
        console.log(response.data.id);
        axios
          .delete(
            `http://localhost:8080/favouriteList/removeFavouriteItem/${response.data.id}/${email}`
          ).then((response) => {
            window.location.reload();
          });
      });
      wishlistDecrease(itemId);
  };

  const handleCart = (id: any) => {
    const list = {
      id: id,
      sessionToken: token,
    };

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

            <div>
              <Button
                onClick={() => removeFavourite(itemId)}
                variant="text"
                size="large"
              >
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}
