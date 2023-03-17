import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Admin from "./MyComponents/Admin";
import { Item } from "./MyComponents/Item";
import Home from "./MyComponents/Home";
import Login from "./MyComponents/Login";
import Logout from "./MyComponents/Logout";
import Navbar from "./MyComponents/Navbar";
import Order1 from "./MyComponents/Order1";
import OrderNext from "./MyComponents/OrderNext";
import { ShoppingCart } from "./MyComponents/ShoppingCart";
import { Favourites } from "./MyComponents/Favourites";
import Register from "./MyComponents/Register";
import AddItem from "./MyComponents/AddItem";
import Users from "./MyComponents/Users";
import ItemCategories from "./MyComponents/ItemCategories";
import AddItemCategory from "./MyComponents/AddItemCategory";
import EditItem from "./MyComponents/EditItem";
import EditItemCategory from "./MyComponents/EditItemCategory";
import ItemsForAdmin from "./MyComponents/ItemsForAdmin";
import { Cart } from "./MyComponents/Cart";
import ForgetPassword from "./MyComponents/ForgetPassword";
import ChangePassword from "./MyComponents/ChangePassword";

export default function MainRoutes() {
  const Test = () => <h1>Page Not Found 404 Error</h1>;
  return (
    <ShoppingCartProvider>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Navigate replace to="home" />} />
          <Route path="/home" element={<Home />}></Route>
          <Route path="/item/:itemCategoryId" element={<Item />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forget" element={<ForgetPassword />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/shoppingCart"
            element={<ShoppingCart isOpen={true} />}
          ></Route>
          <Route path="/order" element={<Order1 />}></Route>
          <Route path="/orderNext" element={<OrderNext />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/itemCategories" element={<ItemCategories />}></Route>
          <Route path="/ItemsForAdmin" element={<ItemsForAdmin />}></Route>
          <Route path="/favourites" element={<Favourites />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/addItem" element={<AddItem />}></Route>
          <Route path="/addItemCategory" element={<AddItemCategory />}></Route>
          <Route path="/editItem/:itemId" element={<EditItem />}></Route>
          <Route path="/changePassword" element={<ChangePassword />}></Route>
          <Route
            path="/editItemCategory/:itemCategoryId"
            element={<EditItemCategory />}
          ></Route>
        </Route>

        <Route path="*" element={<Test />} />
      </Routes>
    </ShoppingCartProvider>
  );
}
