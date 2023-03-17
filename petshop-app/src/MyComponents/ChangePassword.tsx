import { Box, CssBaseline, Avatar, Typography, TextField, Grid, Container, Button, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ThemeProvider,   } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import LockResetIcon from '@mui/icons-material/LockReset';
import axios from 'axios';

type Props = {}
const theme = createTheme();

export default function ChangePassword({}: Props) {

    const [userPassword,setUserPassword] = useState();
    const [userEmail, setUserEmail] = useState("");
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userRole, setUserRole] = useState("");
    const [confirmPassword,setconfirmPassword] = useState();
  const navigate = useNavigate();

  //const otpValue= sessionStorage.getItem("otpToken");
 // useEffect(() => {
    //if(otpValue == null)
    //navigate('/forget')
  

  useEffect(() => {
  
   const otpValue = sessionStorage.getItem("otpValue");
   if(otpValue == null)
   navigate("/forget");

    axios
      .get(
        `http://localhost:8080/user/findByUserPhone/7875954779`
      )
      .then((res) => {
        //setItems(response.data);
        console.log(res.data);
        setUserEmail(res.data?.userEmail);
        setUserFirstName(res.data?.userFirstName);
        setUserLastName(res.data?.userLastName);
        setUserPhone(res.data?.userPhone);
        setUserRole(res.data?.userRole);
       // setUserPassword(res.data?.userPassword);
        
      });
  }, []);


  const error = () =>{
    return
    console.log("Password should match")
  }
  const handlePassword = (e: any) => {
    setUserPassword(e.target.value);
  };
  

    const handleSubmit = () =>{
      let user={
        userEmail: userEmail,
        userFirstName: userFirstName,
        userLastName: userLastName,
        userPhone: userPhone,
        userRole: userRole,
        userPassword:userPassword
       
      }
      axios
      .put(`http://localhost:8080/user/editPassword/7875954779`, user)
      .then((res: { data: any }) => {
        console.log(res.data);
        alert("Edited Successfully");
      
      });
    }

    // if(password == confirmPassword)
    //   navigate("/login")
    //   else
    //   error()
    // }

   
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
            <LockResetIcon />
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
              label="Enter Password"
              name="password"
              type="password"
              value={userPassword}
              onChange={handlePassword}
              autoComplete="email"
            />
            <p></p>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="userPassword"
              value={confirmPassword}
              onChange={(e) => e.target.value}
              autoComplete="new-password"
            />
            <p></p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  </Box>
  )
}