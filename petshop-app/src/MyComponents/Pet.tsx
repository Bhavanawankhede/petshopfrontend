import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreItem } from './StoreItem';

export default function Pet() {
  const [items, setItems] = useState<any[]>([]);
  const [token] = useState(sessionStorage.getItem("token_CUSTOMER"));
  const itemCategoryName = localStorage.getItem("itemCategoryName")
  const sortValue = localStorage.getItem('sortValue');


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

  const sortData = () => {
    if (sortValue == '1') {
      items.sort((a, b) => a.itemName - b.itemName)
    }
    else if(sortValue == '2'){
      items.sort((a,b) => a.itemPrice - b.itemPrice)
    }
    else if(sortValue == '3'){
      items.sort((a,b) => b.itemPrice - a.itemPrice)
    }
    
  }


  const DisplayData =

    items
      .filter((item) => {
        return item.itemName.includes(itemCategoryName);
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
    <div>
    <Container>
      
      <table className="table">
        <tbody className="ShowDogs">
          {DisplayData}

          </tbody>
      </table>
    </Container></div>
  )
}
