import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import "../App.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Navigate, Route, useNavigate } from "react-router-dom";

const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function ItemsForAdmin() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/item/getAllItems").then((response) => {
      setItems(response.data);
    });
  }, []);

  const navigate = useNavigate();

  const deleteItem = (itemId: number) => {
    axios
      .delete(`http://localhost:8080/item/deleteItem/${itemId}`)
      .then((response) => {
        navigate("/items");
      });
  };

  const editItem = (itemId: any) => {
    localStorage.setItem("itemId", itemId);
    navigate(`/editItem/${itemId}`);
  };

  const styleTable = {
    width: 1200,
  };

  return (
    <div className="tableContainer">
      <h1>All Pets</h1>
      <Button
        href="/addItem"
        variant="contained"
        color="success"
        style={{ marginBottom: "10px" }}
      >
        Add Item
      </Button>
      <TableContainer style={styleTable}>
        <Table aria-label="customized table" className="userTable">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Item Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <StyledTableRow key={item.itemName}>
                <StyledTableCell>
                  <img
                    src={require("E:/PetShopWebsiteLatest/myfetminiprojectstuffonacer/Images/" +
                      item.itemImage)}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.itemName}
                </StyledTableCell>
                <StyledTableCell>{item.itemPrice}</StyledTableCell>
                <StyledTableCell>{item.itemDescription}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="text"
                    color="success"
                    onClick={() => editItem(item.itemId)}
                  >
                    <EditIcon />
                  </Button>
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => deleteItem(item.itemId)}
                  >
                    <DeleteIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        <Button href="/admin" variant="contained" color="success">
          Back
        </Button>
      </TableContainer>
    </div>
  );
}
