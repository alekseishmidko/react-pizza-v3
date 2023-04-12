import React from "react";
import empty from "../img/empty-cart.png";
import { Link } from "react-router-dom";
const CartEmpty: React.FC = () => {
  return (
    <div>
      <h2>Корзина пуста</h2>
      <img src={empty} alt="trash" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
