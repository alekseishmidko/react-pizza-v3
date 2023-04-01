import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="App">
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                  />
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
