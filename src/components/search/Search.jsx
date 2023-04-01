import React from "react";
import styles from "./Search.module.scss";
import { useContext } from "react";
// import { SearchContext } from "../../App";

const Search = ({ searchValue, setSearchValue }) => {
  // const { searchValue, setSearchValue } = useContext(SearchContext);
  // console.log(searchValue);
  return (
    <div>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.root}
        type="text"
        placeholder="Поиск"
      />
      <img
        onClick={() => setSearchValue("")}
        className={styles.cross}
        src="./cross.svg"
        alt="cross"
      />
    </div>
  );
};

export default Search;
// value={searchValue}
// onChange={(event) => setSearchValue(event.target.value)}
