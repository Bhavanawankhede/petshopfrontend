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

export default function ItemCategories() {
  const [itemCategories, setItemCategories] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/itemCategory/getAllItemCategory")
      .then((response) => {
        console.log("response");
        setItemCategories(response.data);
      });
  }, []);

  const navigate = useNavigate();

  const deleteItemCategory = (itemCategoryId: number) => {
    axios
      .delete(
        `http://localhost:8080/itemCategory/deleteItemCategory/${itemCategoryId}`
      )
      .then((response) => {
        navigate("/itemCategories");
      });
  };

  const editItemCategory = (itemCategoryId: any) => {
    localStorage.setItem("itemCategoryId", itemCategoryId);
    navigate(`/editItemCategory/${itemCategoryId}`);
  };

  const styleTable = {
    width: 1200,
  };

  return (
    <div className="tableContainer">
      <h1>All Pet Categories</h1>
      <Button
        href="/addItemCategory"
        variant="contained"
        color="success"
        style={{ marginBottom: "10px" }}
      >
        Add Pet Category
      </Button>
      <TableContainer style={styleTable}>
        <Table aria-label="customized table" className="userTable">
          <TableHead>
            <TableRow>
              <StyledTableCell>Category Image</StyledTableCell>
              <StyledTableCell>Category Name</StyledTableCell>
              <StyledTableCell>Category Description</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemCategories.map((itemCategory) => (
              <StyledTableRow key={itemCategory.itemCategoryName}>
                <StyledTableCell>
                  <img
                    src={require("E:/PetShopWebsiteLatest/myfetminiprojectstuffonacer/Images/" +
                      itemCategory.itemCategoryImage)}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {itemCategory.itemCategoryName}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {itemCategory.itemCategoryDescription}
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="text"
                    color="success"
                    onClick={() =>
                      editItemCategory(itemCategory.itemCategoryId)
                    }
                  >
                    <EditIcon />
                  </Button>
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() =>
                      deleteItemCategory(itemCategory.itemCategoryId)
                    }
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
