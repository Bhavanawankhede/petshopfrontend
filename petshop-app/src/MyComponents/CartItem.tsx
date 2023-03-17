import axios from "axios"
import { useEffect, useState } from "react"
import { Stack } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import Button from '@mui/material/Button';

type CartItemProps = {
  petId: number
  quantity: number
}

export function CartItem({ petId, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart()
  const [pets, setPets] = useState<any[]>([]);


  useEffect(() => {
    axios.get('http://localhost:8080/pet/getAllPets').then((response) => {
      console.log("response")
      setPets(response.data);
      console.log(pets);
    });
  }, []);
  const item = pets.find(i => i.petId === petId)
  if (item == null) return null



  return (
    <div>
      <div>
        <img
          src={item.petImage}
          style={{ width: "125px", height: "75px", objectFit: "cover" }}
        />
        <div className="me-auto">
          <div>
            {item.petName}{" "}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: ".65rem" }}>
                x{quantity}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(item.petPrice)}
          </div>
        </div>
        <div> {formatCurrency(item.petPrice * quantity)}</div>
        <Button
          variant="contained"
          size="large"
          color="error"
          onClick={() => removeFromCart(item.petId)}
          className="shoppingcartbtn"
        >
          Remove
        </Button>

      </div>
    </div>
  )
}