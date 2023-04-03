import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

export const searchContext = React.createContext("");
function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="App">
      <searchContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="wrapper">
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                    // searchValue={searchValue}
                    // setSearchValue={setSearchValue}
                    />
                  }
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </searchContext.Provider>
    </div>
  );
}

export default App;
