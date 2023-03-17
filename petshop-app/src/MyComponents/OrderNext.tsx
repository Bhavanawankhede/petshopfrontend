import { Button } from "@mui/material";
import React from "react";

type Props = {};

export default function OrderNext({}: Props) {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Your order has been placed Successfully</h1>
      Continue Shopping ...
      <Button href="/home" color="secondary">
        Home
      </Button>
    </div>
  );
}
