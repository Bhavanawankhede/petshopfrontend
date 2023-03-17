import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [pets, setPets] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/pet/getAllPets").then((response) => {
      console.log("response");
      setPets(response.data);
      console.log(pets);
    });
  }, []);

  const checkout: any = () => {
    navigate("/order");
  };

  return (
    <Card className="mainContainer">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Cart
        </Typography>

        <Stack>
          {cartItems.map((item) => (
            <CartItem {...item} />
          ))}
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ gap: ".5rem" }}
          >
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = pets.find((i) => i.petId === cartItem.petId);
                return total + (item?.petPrice || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
          <div>
            <Button
              className="shoppingcartbtn"
              href="/order"
              variant="contained"
            >
              Proceed to checkout
            </Button>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
