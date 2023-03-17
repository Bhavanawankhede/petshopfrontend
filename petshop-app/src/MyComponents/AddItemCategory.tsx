import {
  Box,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  createTheme,
  Container,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";

type Props = {};

const theme = createTheme();

export default function AddItemCategory({}: Props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [itemCategoryName, setItemCategoryName] = useState("");
  const [itemCategoryImage, setItemCategoryImage] = useState("");
  const [itemCategoryDescription, setItemCategoryDescription] = useState("");
  const [token] = useState(sessionStorage.getItem("token_ADMIN"));
  useEffect(() => {
    if (token == null) {
        navigate("/home");
    }
  },[])

  const handleItemCategoryNameChange = (e: any) => {
    setItemCategoryName(e.target.value);
  };
  const handleItemCategoryDescriptionChange = (e: any) => {
    setItemCategoryDescription(e.target.value);
  };
  const handleItemCategoryImageChange = (e: any) => {
    console.log(e.target.files[0]);
    setItemCategoryImage(e.target.files[0]);
  };

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData();

    data.append("itemCategoryName", itemCategoryName);
    data.append("itemCategoryImage", itemCategoryImage);
    data.append("itemCategoryDescription", itemCategoryDescription);

    console.log(data);
    setIsSubmit(true);

    axios
      .post("http://localhost:8080/itemCategory/addItemCategory", data)
      .then((res: { data: any }) => {
        console.log("Response" + res.data);

        navigate("/itemCategories");
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
              Add Pet Category
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    id="itemCategoryName"
                    label="Item Category Name"
                    name="itemCategoryName"
                    value={itemCategoryName}
                    onChange={handleItemCategoryNameChange}
                    autoComplete="family-name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    id="itemCategoryDescription"
                    label="Item Category Description"
                    name="itemCategoryDescription"
                    value={itemCategoryDescription}
                    onChange={handleItemCategoryDescriptionChange}
                    autoComplete="family-name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <input
                    className="form-control"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    name="itemCategoryImage"
                    onChange={handleItemCategoryImageChange}
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
