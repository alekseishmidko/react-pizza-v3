import React from "react";
import Categories from "../components/categories/Categories";
import Card from "../components/card/Card";
import Skeleton from "../components/card/Skeleton";
import Sort from "../components/sort/Sort";
const Home = () => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [activeIndexCategory, setActiveIndexCategory] = React.useState(0);
  const [activeSortIndex, setActiveSortIndex] = React.useState({
    name: "популярности(DESC)",
    sortProperty: "rating",
  });
  //
  React.useEffect(() => {
    setLoading(true);
    fetch(
      `https://63e3ba61c919fe386c0d7fe5.mockapi.io/items?${
        activeIndexCategory > 0 ? `category=${activeIndexCategory}` : ""
      } &sortBy=${activeSortIndex.sortProperty}&order=desc`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setLoading(false);
      });
  }, [activeIndexCategory, activeSortIndex]);
  console.log(
    "activeIndexCategory",
    activeIndexCategory,
    "activeSortIndex",
    activeSortIndex
  );

  return (
    <div>
      <div className="content__top">
        <Categories
          activeIndexCategory={activeIndexCategory}
          setActiveIndexCategory={setActiveIndexCategory}
        />
        <Sort
          activeSortIndex={activeSortIndex}
          setActiveSortIndex={setActiveSortIndex}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <Card key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default Home;
