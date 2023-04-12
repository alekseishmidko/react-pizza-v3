import React from "react";
type CategoriesProps = {
  activeIndexCategory: number;
  onClickCategory: (n: number) => void;
};
const Categories: React.FC<CategoriesProps> = ({
  activeIndexCategory,
  onClickCategory,
}) => {
  // const [activeIndex, setActiveIndex] = React.useState([0]);
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div>
      <div className="categories">
        <ul>
          {categories.map((item, id) => (
            <li
              key={id}
              className={activeIndexCategory === id ? "active" : ""}
              // onClick={() => setActiveIndexCategory(id)}
              onClick={() => onClickCategory(id)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
