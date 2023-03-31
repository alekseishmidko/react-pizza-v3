import React from "react";

const Card = (props) => {
  const [countPizza, setCountPizza] = React.useState(0);

  //
  const addCount = () => {
    setCountPizza(countPizza + 1);
  };
  //
  const pizzaSizes = ["26 см.", "30 см.", "40 см."];
  const [sizePizza, setSizePizza] = React.useState(0);
  //
  const pizzaTypes = ["тонкое", "традиционное"];
  const [typePizza, setTypePizza] = React.useState(0);
  //
  return (
    <div>
      <div className="pizza-block">
        <img className="pizza-block__image" src={props.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{props.title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {pizzaTypes.map((item, id) => (
              <li
                key={id}
                className={typePizza === id ? "active" : ""}
                onClick={() => setTypePizza(id)}
              >
                {item}
              </li>
            ))}
          </ul>
          <ul>
            {pizzaSizes.map((item, id) => (
              <li
                onClick={() => setSizePizza(id)}
                className={sizePizza === id ? "active" : ""}
                key={id}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {props.price} ₽</div>
          <div
            className="button button--outline button--add"
            onClick={addCount}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{countPizza}</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
