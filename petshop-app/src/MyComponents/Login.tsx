import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const theme = createTheme();

function SignIn() {
  const initialValues = {
    userEmail: "",
    userPassword: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const data = {
    userEmail: userEmail,
    userPassword: userPassword,
  };
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({
    userEmail: "",
    userPassword: "",
  });
  const validEmail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");

  let token: any = null;
  let loggedin = false;
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0) {
      console.log(formErrors);
    }
  }, [formErrors]);
  const validate = (values: any) => {
    const errors: any = {};
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
      errors.userPassword = "Password cannot exceed more than 20 characters";
    }

    return errors;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(data);
    setFormErrors(validate(formValues));
    console.log(formErrors);

    // axios
    //   .post("http://localhost:8080/user/userLogin", formValues)
    //   .then((res: { data: any }) => {
    //     let role = res.data.userRole;
    //     console.log(res.data.userRole);

    //     localStorage.setItem("userEmail", res.data.userEmail);
    //     if (
    //       formValues.userEmail == res.data.userEmail &&
    //       formValues.userPassword == res.data.userPassword
    //     ) {
    //       token = localStorage.getItem("userEmail");
    //       if (role == "ADMIN") {
    //         // alert("Welcome Admin")
    //         window.location.replace("http://localhost:3000/admin");
    //       }
    //       if (role == "CUSTOMER") {
    //         window.location.replace("http://localhost:3000/home");
    //       }
    //     } else {
    //       alert("Wrong Credentials");
    //     }
    //   });

    axios
      .post("http://localhost:8080/user/authenticate", formValues, config)
      .then((res: { data: any }) => {
        console.log(res.data);
        let role = res.data.userRole;
        localStorage.setItem("userEmail", res.data.userEmail);
        sessionStorage.setItem(`token_${role}`, res.data.token);
        const token = sessionStorage.getItem("token_ADMIN");
        if (
          formValues.userEmail == res.data.userEmail &&
          formValues.userPassword == res.data.userPassword
        ) {
          
          if (role == "ADMIN") {
            swal({
              title: "Admin Login Successful",
              icon: "success",
              timer: 2000,
            });
            navigate("/admin");
            
          } else if (role == "CUSTOMER") {
            swal({
              title: "User Login Successful",
              icon: "success",
              timer: 2000,
            });

            navigate("/home");
          } else {

            console.log("Wrong Credentials");
            alert("Wrong Credentials");
          }
        }
      });
  };

  return (
    <Box padding={10}>
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
            <Avatar sx={{ bgcolor: "#9575cd" }} variant="rounded">
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="/forget"
                    variant="body2"
                    sx={{ my: 2, color: "blue", display: "block" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <br />
                <Grid item className="signUpContainer">
                  <Link
                    href="/register"
                    variant="body2"
                    sx={{ my: 2, color: "red", display: "block" }}
                  >
                    Don't have an account? Sign Up
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

export default SignIn;


