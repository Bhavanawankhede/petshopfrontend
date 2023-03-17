import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreItem } from './StoreItem';

export default function PetFood() {
  const [items, setItems] = useState<any[]>([]);
  const [token] = useState(sessionStorage.getItem("token_CUSTOMER"));


  type itemCategoryIdType = {
    itemCategoryId: number;
  };

  const { itemCategoryId } = useParams() as any;
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      navigate("/home");
    }
    axios
      .get(
        `http://localhost:8080/item/getAllItemsByItemCategoryId/${itemCategoryId}`
      )
      .then((response) => {
        setItems(response.data);
      });
  }, []);
  const DisplayData =
    items
  .filter((item) => {
    return item.itemName.includes('Food');
  })
  
  .map((item) => {
    return (
      <tr key={item.id}>
        <td>
          <StoreItem {...item} />
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
  )
}
