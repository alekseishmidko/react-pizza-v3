import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveSortIndex } from "../../redux/slices/filterSlice";

export const list: { name: string; sortProperty: string }[] = [
  { name: "популярности(DESC)", sortProperty: "rating" },
  { name: "цене(DESC)", sortProperty: "price" },
  { name: "алфавиту(DESC)", sortProperty: "title" },
];

const Sort = () => {
  const dispatch = useDispatch();
  const activeSortIndex = useSelector(
    (state) => state.filterSlice.activeSortIndex
  );
  type clickPopup = MouseEvent & {
    path: Node[];
  };
  // cкрытие окна попап при клике на область вне попапа
  const sortRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setPopup(false);
      }
    };

    document.body.addEventListener("click", handleClickOutSide);
    return () => {
      document.body.removeEventListener("click", handleClickOutSide);
    };
  }, []);
  //
  const [popup, setPopup] = React.useState(false);

  const onClickSort = (item, id) => {
    dispatch(setActiveSortIndex(item));

    setPopup(false);
  };

  return (
    <div>
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
          <span onClick={() => setPopup(!popup)}>{activeSortIndex.name}</span>
        </div>
        {popup && (
          <div className="sort__popup">
            <ul>
              {list.map((item, id) => (
                <li
                  className={
                    activeSortIndex.sortProperty === list[id].sortProperty
                      ? "active"
                      : ""
                  }
                  key={id}
                  onClick={() => onClickSort(item)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sort;
{
  /* <li className="active">популярности</li>
              <li>цене</li>
              <li>алфавиту</li> */
}
// className={"active": ''}
// className={activeSortIndex === id ? "active" : ""}
// { activeSortIndex, setActiveSortIndex }
