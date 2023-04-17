import React from "react";
import Categories from "../components/categories/Categories.tsx";
import Card from "../components/card/Card.tsx";
import Skeleton from "../components/card/Skeleton.tsx";
import Sort, { list } from "../components/sort/Sort.tsx";
import Pagination from "../Pagination/Pagination.tsx";
// import qs from "qs";
import { Link } from "react-router-dom";
//
import {
  selectFilterActiveIndexCategory,
  selectFilterCurrentPage,
  selectFilterSearchValue,
  selectFilterActiveSortIndex,
} from "../redux/slices/filterSlice.ts";
//
import { selectPizzaSlice } from "../redux/slices/pizzaSlice.ts";
import { useSelector, useDispatch } from "react-redux";

import {
  setActiveIndexCategory,
  setCurrentPage,
  setSearchValue,
} from "../redux/slices/filterSlice.ts";

import { setItems, fetchPizzas } from "../redux/slices/pizzaSlice.ts";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  //
  const searchValue = useSelector(selectFilterSearchValue);
  const activeIndexCategory = useSelector(selectFilterActiveIndexCategory);

  const onClickCategory = (id: number) => {
    dispatch(setActiveIndexCategory(id));
  };

  const activeSortIndex = useSelector(selectFilterActiveSortIndex);
  const currentPage = useSelector(selectFilterCurrentPage);
  const pageCountChange = (number: number) => {
    dispatch(setCurrentPage(number));
  };
  //
  // бизнес логика
  const { items, status } = useSelector(selectPizzaSlice);

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
