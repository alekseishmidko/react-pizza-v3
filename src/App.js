import "./App.css";
import React from "react";
import "./scss/app.scss";
import Header from "./components/header/Header";
import Categories from "./components/categories/Categories";
import Card from "./components/card/Card";
import Sort from "./components/sort/Sort";
import pizzas from "./assets/pizza.json";
function App() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    fetch("https://63e3ba61c919fe386c0d7fe5.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {items.map((item) => (
                <Card key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
{
  /* <Card /> */
}
