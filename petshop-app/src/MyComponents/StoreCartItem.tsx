import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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


type StoreCartItemProps = {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemImage: string;
  itemDescription: string;
};



export function StoreCartItem({
  itemId,
  itemName,
  itemPrice,
  itemImage,
  itemDescription,
}: StoreCartItemProps) {
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  const { t } = useTranslation(['home', 'main']);

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
  } = useShoppingCart();

  const quantity = getItemQuantity(itemId);
  const token = localStorage.getItem("userEmail");

  const removeCartItem = (itemId: any) => {
    axios
      .get(
        `http://localhost:8080/cartList/getCartItemIdFromItemId/${itemId}`,
        config
      )
      .then((response) => {
        axios
          .delete(
            `http://localhost:8080/cartList/removeCartItem/${response.data.cartItemId}/${token}`
          )
          .then((response) => {
            window.location.reload();
          });
      });
    decreaseCartQuantity(itemId);
  };

  const placeOrder = (id: any) => {
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
            
            <div>
              <Button
                onClick={() => removeCartItem(itemId)}
                variant="text"
                size="large"
                color="error"
              >
                {t("storeCartItemRemove", { ns: ['main', 'home'] })}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}
