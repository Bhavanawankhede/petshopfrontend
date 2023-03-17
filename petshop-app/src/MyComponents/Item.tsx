import '../App.css'
import { Container, Form, InputGroup } from "react-bootstrap";
import { StoreItem } from "./StoreItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import PetFood from './PetFood';
import PetAccessories from './PetAccessories';
import Pet from './Pet';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTranslation } from 'react-i18next';

export function Item() {
  const [items, setItems] = useState<any[]>([]);
  const [tempItem, setTempItem] = useState<any[]>([]);
  const [token] = useState(sessionStorage.getItem("token_CUSTOMER"));
  const [pet, setPet] = useState(true);
  const [petFood, setPetFood] = useState(false);
  const [petAccessories, setPetAccessories] = useState(false);


  const { t } = useTranslation(['home', 'main']);



  type itemCategoryIdType = {
    itemCategoryId: number;
  };

  const { itemCategoryId } = useParams() as any;
  const navigate = useNavigate();
  const itemCategoryName = localStorage.getItem("itemCategoryName")
  const [filterValue, setFilterValue] = useState('');
  const [sortValue, setSortValue] = useState('');

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
        setTempItem(items);
      });
  }, []);



  const handleChangeFilter = (event: SelectChangeEvent) => {
    setFilterValue(event.target.value as string);
  };

  const handleChangeSort = (event: SelectChangeEvent) => {
    setSortValue(event.target.value as string);
    localStorage.setItem("sortValue", sortValue);
  };

  const sortItemsByChoice = () => {
    if (sortValue == "name") {
      return (
        items
          .sort((a, b) => {
            return b.itemName - a.itemName
          })
        // .map((item) => {
        //   return (
        //     <tr key={item.id}>
        //       <td>
        //         <StoreItem {...item} />
        //       </td>
        //     </tr>
        //   );
        // })
      )

    }
    if (sortValue == "ltoh") {
      return (
        items
          .sort((a, b) => {
            return a.itemPrice - b.itemPrice
          })
        // .map((item) => {
        //   return (
        //     <tr key={item.id}>
        //       <td>
        //         <StoreItem {...item} />
        //       </td>
        //     </tr>
        //   );
        // })
      )

    }
    if (sortValue == "htol") {
      return (
        items
          .sort((a, b) => {
            return b.itemPrice - a.itemPrice
          })
        // .map((item) => {
        //   return (
        //     <tr key={item.id}>
        //       <td>
        //         <StoreItem {...item} />
        //       </td>
        //     </tr>
        //   );
        // })
      )

    }

  }

  const DisplayData = () => {
    sortItemsByChoice();
    if (filterValue == "1") {
      return (
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
          })
      )

    }
    else if (filterValue == "2") {
      // sortItemsByChoice();
      return (
        items
          .filter((item) => {
            return item.itemName.includes("Food");
          })
          .map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <StoreItem {...item} />
                </td>
              </tr>
            );
          })
      )

    }
    else if (filterValue == "3") {
      // sortItemsByChoice();
      return (
        items
          .filter((item) => {
            return item.itemName.includes('Accessories');
          })
          .map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <StoreItem {...item} />
                </td>
              </tr>
            );
          })
      )

    }
    else {
      return (
        items
          .map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <StoreItem {...item} />
                </td>
              </tr>
            );
          })
      )
    }





  }





  return (
    <Container>
      <Form>
        <div>
          <h2>he</h2>
        </div>
        <InputGroup className="my-3">
        </InputGroup>
      </Form><br />
      <Box>
        <FormControl className="petSelect" variant='filled'>
          <InputLabel className='inputlabel'><FilterListIcon color='primary' fontSize='medium' />{t("itemFilter", { ns: ['main', 'home'] })}</InputLabel>
          <Select
            value={filterValue}
            onChange={handleChangeFilter}
          >
            <MenuItem value={1} onClick={DisplayData}>{itemCategoryName}</MenuItem>
            <MenuItem value={2} onClick={DisplayData}>{itemCategoryName} food</MenuItem>
            <MenuItem value={3} onClick={DisplayData}>{itemCategoryName} Accessories</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className="paddingClass">
        <FormControl className="petSelect" variant='filled'>
          <InputLabel className='inputlabel'><FilterListIcon color='primary' fontSize='medium' />{t("itemSort", { ns: ['main', 'home'] })}</InputLabel>
          <Select
            value={sortValue}
            onChange={handleChangeSort}

          >
            <MenuItem value="name">By Name</MenuItem>
            <MenuItem value="ltoh">By Price- Low to High</MenuItem>
            <MenuItem value="htol" >By Price - High to Low</MenuItem>
          </Select>


        </FormControl>
      </Box>

      <h1>{t("itemResult", { ns: ['main', 'home'] })}</h1>
      <h3 className='h3Tag'>{t("itemDescription", { ns: ['main', 'home'] })}</h3>

      <table className="table">
        <tbody className="ShowDogs">
          {DisplayData()}

        </tbody>
      </table>


      {/* {pet && <Pet />}
      {petFood && <PetFood />}
      {petAccessories && <PetAccessories />} */}

    </Container>
  );
}
