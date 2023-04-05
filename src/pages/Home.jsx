import React from "react";
import ReactPaginate from "react-paginate";
import Categories from "../components/categories/Categories";
import Card from "../components/card/Card";
import Skeleton from "../components/card/Skeleton";
import Sort from "../components/sort/Sort";
import Pagination from "../Pagination/Pagination";
//
import { useSelector, useDispatch } from "react-redux";
import { searchContext } from "../App";
import { setActiveIndexCategory } from "../redux/slices/filterSlice";

const Home = () => {
  const activeIndexCategory = useSelector(
    (state) => state.filterSlice.activeIndexCategory
  );
  console.log(activeIndexCategory, "redux state category index");
  const onClickCategory = (id) => {
    dispatch(setActiveIndexCategory(id));
  };

  const dispatch = useDispatch();
  //
  const activeSortIndex = useSelector(
    (state) => state.filterSlice.activeSortIndex
  );
  // console.log(activeSortIndex, "redux state sort index");
  //
  //
  const { searchValue, setSearchValue } = React.useContext(searchContext);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  // const [activeIndexCategory, setActiveIndexCategory] = React.useState(0);
  // const [activeSortIndex, setActiveSortIndex] = React.useState({
  //   name: "популярности(DESC)",
  //   sortProperty: "rating",
  // });
  const search = searchValue
    ? `&search=${searchValue.toLocaleLowerCase()}`
    : "";
  //
  //
  const [currentPage, setCurrentPage] = React.useState(1);
  React.useEffect(() => {
    setLoading(true);
    fetch(
      `https://63e3ba61c919fe386c0d7fe5.mockapi.io/items?${search}${
        activeIndexCategory > 0 ? `&category=${activeIndexCategory}` : ""
      }&sortBy=${activeSortIndex.sortProperty}&page=${currentPage}&limit=4`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setLoading(false);
      });
  }, [
    activeIndexCategory,
    activeSortIndex,
    searchValue,
    setSearchValue,
    currentPage,
  ]);
  //
  const skeletonArray = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  //
  const pizzasItems = items.map((item) => <Card key={item.id} {...item} />);

  return (
    <div>
      <div className="content__top">
        <Categories
          activeIndexCategory={activeIndexCategory}
          // setActiveIndexCategory={setActiveIndexCategory}
          onClickCategory={onClickCategory}
        />

        <Sort
        // activeSortIndex={activeSortIndex}
        // setActiveSortIndex={setActiveSortIndex}
        />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading ? skeletonArray : pizzasItems}
      </div>
      <Pagination onPageChange={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;

// "https://63e3ba61c919fe386c0d7fe5.mockapi.io/items"
// items.map((item) => <Card key={item.id} {...item} />)

// фильтрация на фронте
// .filter((item) => {
//   if (
//     item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
//   ) {
//     return true;
//   }
// })
