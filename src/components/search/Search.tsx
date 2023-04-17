import React, { MouseEventHandler } from "react";
import styles from "./Search.module.scss";
import cross from "./cross.svg";
// import { searchContext } from "../../App";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice.ts";
// type SearchProp = {}
const Search: React.FC = () => {
  const searchValue = useSelector((state) => state.filterSlice.searchValue);
  const dispatch = useDispatch();
  // const { searchValue, setSearchValue } = React.useContext(searchContext);
  const [value, setValue] = React.useState("");
  //
  const inputRef = React.useRef<HTMLInputElement>(null);
  //
  const testDeb = React.useCallback(
    debounce(() => {
      console.log("debounce");
    }, 1000),
    []
  );
  const onClickClear = (event: React.MouseEvent<SVGSVGElement>) => {
    dispatch(setSearchValue(""));
    if (inputRef.current) inputRef.current.focus();
    setValue("");
    // inputRef.current?.focus();
  };
  //
  const updateSearchValue = React.useCallback(
    debounce((string) => {
      dispatch(setSearchValue(string));
    }, 400),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <div>
      <input
        ref={inputRef}
        value={value}
        // onChange={(event) => setSearchValue(event.target.value)}
        onChange={onChangeInput}
        className={styles.root}
        type="text"
        placeholder="Поиск"
      />
      <>
        {value && (
          <img
            // onClick={() => setSearchValue("")}
            onClick={() => onClickClear()}
            className={styles.cross}
            src={cross}
            alt="cross"
          />
        )}
      </>
    </div>
  );
};

export default Search;
// value={searchValue}
// onChange={(event) => setSearchValue(event.target.value)}
