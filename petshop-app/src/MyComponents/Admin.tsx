import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import ItemsForAdmin from "./ItemsForAdmin";
import ItemCategories from "./ItemCategories";
import Users from "./Users";
import axios from "axios";

type Props = {};

export default function Admin({}: Props) {
  const navigate = useNavigate();

  const [showUser, setShowUser] = useState(true);
  const [ShowItemCategory, setShowItemCategory] = useState(false);
  const [showItems, setShowItems] = useState(false);

  const [token, setToken] = useState(sessionStorage.getItem("token_ADMIN"));
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  useEffect(() => {
    let header = {
      headers: {
        Authorization: "Bearer" + token,
      },
    };

    let loggedin = false;
    if (token == null) {
      loggedin = true;
    }
    if (loggedin == true) {
      navigate("/home");
    }
  });

  const formWidth = {
    width: 400,
  };

  const showUserData = () => {
    setShowUser(true);
    setShowItemCategory(false);
    setShowItems(false);
  };

  const showAllItemCategoryData = () => {
    setShowUser(false);
    setShowItemCategory(true);
    setShowItems(false);
  };

  const showAllItemData = () => {
    setShowUser(false);
    setShowItemCategory(false);
    setShowItems(true);
  };

  return (
    <>
      <div className="outerDiv">
        <div className="mainContainer" style={formWidth}>
          <table>
            <tr>
              <td>
                <Button
                  className="rows"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={showUserData}
                >
                  Users
                </Button>
              </td>
            </tr>

            <tr>
              <td>
                <Button
                  className="rows"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={showAllItemCategoryData}
                >
                  Item Categories
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button
                  className="rows"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={showAllItemData}
                >
                  Items
                </Button>
              </td>
            </tr>
          </table>
        </div>
        <div>
          {showUser && <Users />}
          {ShowItemCategory && <ItemCategories />}
          {showItems && <ItemsForAdmin />}
        </div>
      </div>
    </>
  );
}
