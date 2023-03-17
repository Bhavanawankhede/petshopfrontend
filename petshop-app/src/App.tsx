
import path from "node:path/win32";
import { useState } from "react";
import "./App.css";
import MainRoutes from "./MainRoutes";
import { Footer } from "./MyComponents/Footer";
import Navbar from "./MyComponents/Navbar";
import React, { Component, Suspense } from "react";

import "./App.css";




function App() {

  return (
    <div>
      <Navbar></Navbar>
      <MainRoutes></MainRoutes>
      <Footer></Footer>
    </div>
  );
}

export default App;
