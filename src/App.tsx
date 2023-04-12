import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";
import Header from "./components/header/Header.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Cart from "./pages/Cart.tsx";
import FullPizza from "./pages/FullPizza.tsx";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/:id" element={<FullPizza />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
