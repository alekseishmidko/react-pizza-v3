import React from "react";
import Categories from "../components/categories/Categories";
import Card from "../components/card/Card";
import Skeleton from "../components/card/Skeleton";
import Sort, { list } from "../components/sort/Sort";
import Pagination from "../Pagination/Pagination";
// import qs from "qs";
import { Link } from "react-router-dom";

//
import { useSelector, useDispatch } from "react-redux";

import {
  setActiveIndexCategory,
  setCurrentPage,
  setSearchValue,
} from "../redux/slices/filterSlice";
import { setItems, fetchPizzas } from "../redux/slices/pizzaSlice";

const Home = () => {
  const dispatch = useDispatch();
  //
  const searchValue = useSelector((state) => state.filterSlice.searchValue);
  const activeIndexCategory = useSelector(
    (state) => state.filterSlice.activeIndexCategory
  );

  const onClickCategory = (id) => {
    dispatch(setActiveIndexCategory(id));
  };

  const activeSortIndex = useSelector(
    (state) => state.filterSlice.activeSortIndex
  );
  const currentPage = useSelector((state) => state.filterSlice.currentPage);
  const pageCountChange = (number) => {
    dispatch(setCurrentPage(number));
  };
  //
  // бизнес логика
  const { items, status } = useSelector((state) => state.pizzaSlice);

  const search = searchValue
    ? `&search=${searchValue.toLocaleLowerCase()}`
    : "";

  const getPizzas = async () => {
    try {
      dispatch(
        fetchPizzas({
          search,
          activeSortIndex,
          currentPage,
          activeIndexCategory,
        })
      );
    } catch (error) {
    } finally {
    }
  };

  React.useEffect(() => {
    getPizzas();
  }, [
    activeIndexCategory,
    activeSortIndex,
    searchValue,
    setSearchValue,
    currentPage,
  ]);

  // парсинг адреса
  // React.useEffect(() => {
  //   const queryString = qs.stringify({
  //     sortProperty: activeSortIndex.sortProperty,
  //     activeIndexCategory: activeIndexCategory,
  //     currentPage: currentPage,
  //   });
  //   navigate(`?${queryString}`);
  //   // console.log(queryString);
  // }, [
  //   activeIndexCategory,
  //   activeSortIndex,
  //   searchValue,
  //   setSearchValue,
  //   currentPage,
  // ]);
  //
  const skeletonArray = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzasItems = items.map(
    (item) => (
      // <Link key={item.id} to={`/pizza/${item.id}`}>
      <Card key={item.id} {...item} />
    )
    //* </Link> */}
  );

  return (
    <div>
      <div className="content__top">
        <Categories
          activeIndexCategory={activeIndexCategory}
          onClickCategory={onClickCategory}
        />

        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div>
          {" "}
          <h2>Ошибка </h2>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletonArray : pizzasItems}
        </div>
      )}

      <Pagination onPageChange={(number) => pageCountChange(number)} />
    </div>
  );
};

export default Home;
