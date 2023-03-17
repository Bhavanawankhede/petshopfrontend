import {
  Box,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  TextareaAutosize,
  createTheme,
  Container,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";

type Props = {};

const theme = createTheme();

export default function AddItem({}: Props) {
  const [items, setItems] = useState<any[]>([]);

  const [isSubmit, setIsSubmit] = useState(false);

  const [categoryId, setcategoryId] = useState("");
  const [categoryName, setcategoryName] = useState("");
  const [itemName, setitemName] = useState("");
  const [itemPrice, setitemPrice] = useState("");
  const [itemImage, setitemImage] = useState("");
  const [itemDescription, setitemDescription] = useState("");
  const [token] = useState(sessionStorage.getItem("token_ADMIN"));

  useEffect(() => {
    if (token == null) {
      navigate("/home");
  }
    axios
      .get("http://localhost:8080/itemCategory/getAllItemCategory")
      .then((response) => {
        console.log("response");
        setItems(response.data);

        console.log(response.data);
      });
  }, []);

  const handleCategoryIdChange = (e: any) => {
    setcategoryId(e.target.value);
  };
  const handleCategoryNameChange = (e: any) => {
    setcategoryName(e.target.value);
  };
  const handleItemNameChange = (e: any) => {
    setitemName(e.target.value);
  };
  const handleItemPriceChange = (e: any) => {
    setitemPrice(e.target.value);
  };
  const handleItemImageChange = (e: any) => {
    console.log(e.target.files[0]);
    setitemImage(e.target.files[0]);
  };
  const handleItemDescriptionChange = (e: any) => {
    setitemDescription(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = new FormData();

    data.append("itemCategoryId", categoryId);
    data.append("categoryName", categoryName);
    data.append("itemName", itemName);
    data.append("itemPrice", itemPrice);
    data.append("itemImage", itemImage);
    data.append("itemDescription", itemDescription);

    setIsSubmit(true);

    axios
      .post("http://localhost:8080/item/addItem", data)
      .then((res: { data: any }) => {
        console.log("Response" + res.data);
        alert("Added Successfully");
        navigate("/items");
      });
  };
  return (
    <Box padding={10}>
      <Outlet />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Add Item
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Pet category
                    </InputLabel>
                    <Select
                      className="form-control"
                      name="categoryId"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={categoryId}
                      label="category"
                      onChange={handleCategoryIdChange}
                    >
                      <MenuItem value={0}>Select Pet</MenuItem>
                      {items.map((item) => (
                        <MenuItem value={item.itemCategoryId}>
                          {item.itemCategoryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    id="categoryName"
                    label="Category Name"
                    name="categoryName"
                    value={categoryName}
                    onChange={handleCategoryNameChange}
                    autoComplete="family-name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    id="itemName"
                    label="Item Name"
                    name="itemName"
                    value={itemName}
                    onChange={handleItemNameChange}
                    autoComplete="family-name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    id="itemPrice"
                    label="Price"
                    name="itemPrice"
                    value={itemPrice}
                    onChange={handleItemPriceChange}
                    autoComplete="email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextareaAutosize
                    className="form-control"
                    minRows={3}
                    style={{ width: 500 }}
                    name="itemDescription"
                    placeholder="Item Description"
                    id="itemDescription"
                    value={itemDescription}
                    onChange={handleItemDescriptionChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <input
                    className="form-control"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    name="itemImage"
                    onChange={handleItemImageChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
}
