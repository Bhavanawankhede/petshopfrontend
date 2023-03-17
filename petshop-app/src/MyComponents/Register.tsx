import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Avatar } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import "../App.css";
import swal from "sweetalert";

const theme = createTheme();

export default function Register() {
  const userRole = "CUSTOMER";

  const initialValues = {
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
    userRole: userRole,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const validEmail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.userFirstName) {
      errors.userFirstName = "First Name is required!";
    }
    if (!values.userLastName) {
      errors.userLastName = "Last Name is required!";
    }
    if (!values.userEmail) {
      errors.userEmail = "Email is required!";
    } else if (!validEmail.test(values.userEmail)) {
      errors.userEmail = "This is not a valid email format!";
    }
    if (!values.userPassword) {
      errors.userPassword = "Password is required";
    } else if (values.userPassword.length < 4) {
      errors.userPassword = "Password must be more than 4 characters";
    } else if (values.userPassword.length > 15) {
      errors.userPassword = "Password cannot exceed more than 15 characters";
    }
    if (!values.userConfirmPassword) {
      errors.userConfirmPassword = "Confirm Password is required";
    } else if (values.userPassword != values.userConfirmPassword) {
      errors.userConfirmPassword =
        "Password and Confirm Password does not match.";
    }
    return errors;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formValues);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0) {
      axios
        .post("http://localhost:8080/user/addUser", formValues)
        .then((res: { data: any }) => {
          swal({
            title: "Registered Successfully",
            icon: "success",
            timer: 2000,
          });
          // window.location.replace("http://localhost:3000/login");
          navigate("/login");
        });
    }
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
            {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre></pre>
      )} */}
            <Avatar sx={{ bgcolor: "#9575cd" }} variant="rounded">
              <HowToRegIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="userFirstName"
                    label="First Name"
                    name="userFirstName"
                    value={formValues.userFirstName}
                    onChange={handleChange}
                    autoComplete="family-name"
                  />
                  <p className="ErrorClass">{formErrors.userFirstName}</p>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="userLastName"
                    label="Last Name"
                    name="userLastName"
                    value={formValues.userLastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                  />
                  <p className="ErrorClass">{formErrors.userLastName}</p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="userEmail"
                    label="Email Address"
                    name="userEmail"
                    value={formValues.userEmail}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  <p className="ErrorClass">{formErrors.userEmail}</p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="userPassword"
                    label="Password"
                    type="password"
                    id="userPassword"
                    value={formValues.userPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                  <p className="ErrorClass">{formErrors.userPassword}</p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="userConfirmPassword"
                    label="ConfirmPassword"
                    type="password"
                    id="userConfirmPassword"
                    value={formValues.userConfirmPassword}
                    onChange={handleChange}
                    autoComplete="Confirm-password"
                  />
                  <p className="ErrorClass">{formErrors.userConfirmPassword}</p>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/login"
                    variant="body2"
                    sx={{ my: 2, color: "red", display: "block" }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
}
