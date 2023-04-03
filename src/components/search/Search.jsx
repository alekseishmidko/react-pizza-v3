import React from "react";
import styles from "./Search.module.scss";

import { searchContext } from "../../App";

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(searchContext);
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
