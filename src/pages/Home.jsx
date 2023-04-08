import React from "react";
import ReactPaginate from "react-paginate";
import Categories from "../components/categories/Categories";
import Card from "../components/card/Card";
import Skeleton from "../components/card/Skeleton";
import Sort, { list } from "../components/sort/Sort";
import Pagination from "../Pagination/Pagination";
import qs from "qs";
import { useNavigate } from "react-router-dom";

//
import { useSelector, useDispatch } from "react-redux";
// import { searchContext } from "../App";
import {
  setActiveIndexCategory,
  setCurrentPage,
  setSearchValue,
} from "../redux/slices/filterSlice";
import { setItems, fetchPizzas } from "../redux/slices/pizzaSlice";

const Home = () => {
  const navigate = useNavigate();
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

  // const { searchValue, setSearchValue } = React.useContext(searchContext);
  // const [items, setItems] = React.useState([]);
  // const [loading, setLoading] = React.useState(true);
  //
  const search = searchValue
    ? `&search=${searchValue.toLocaleLowerCase()}`
    : "";
  // запрос на бекенд
  // React.useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(
  //       `https://63e3ba61c919fe386c0d7fe5.mockapi.io/items?${search}${
  //         activeIndexCategory > 0 ? `&category=${activeIndexCategory}` : ""
  //       }&sortBy=${activeSortIndex.sortProperty}&page=${currentPage}&limit=4`
  //     )
  //     .then((res) => {
  //       dispatch(setItems(res.data));
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err, "error catch");
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [
  //   activeIndexCategory,
  //   activeSortIndex,
  //   searchValue,
  //   setSearchValue,
  //   currentPage,
  // ]);
  const getPizzas = async () => {
    try {
      console.log("11112121");
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
  const pizzasItems = items.map((item) => <Card key={item.id} {...item} />);

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
