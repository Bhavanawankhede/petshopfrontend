import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Logout({}: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("userEmail");
    sessionStorage.clear();
    localStorage.removeItem("wishItem");
    localStorage.clear();
    //window.location.reload();
    navigate("/login");
  });

  return (
    <Box>
      <br />
      <br />
      <br />
      <h1>You have been logged out</h1>
      <h3>Login Again....</h3>
      <Button href="/home" color="secondary">
        Home
      </Button>
    </Box>
  );
}
