import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/cartItem/CartItem.tsx";
import { useSelector, useDispatch } from "react-redux";
import { clearItem } from "../redux/slices/cartSlice.js";
import trash from "../img/trash.svg";
import CartEmpty from "./CartEmpty.tsx";
const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cartSlice);
  const itemsCount = items.reduce((sum: number, obj: any) => {
    return obj.count + sum;
  }, 0);
  const itemsPrice = items.reduce((sum: number, obj: any) => {
    return obj.count * obj.price + sum;
  }, 0);

  const onClickClear = () => {
    if (window.confirm("очистить корзину?")) dispatch(clearItem());
  };
  if (!itemsPrice) {
    return <CartEmpty />;
  }
  return (
    <div className="container container--cart">
      <div className="wrapper">
        {items.length > 0 && (
          <div onClick={() => onClickClear()} className="cart__clear">
            {" "}
            <img src={trash} alt="trash" />
            Очистить корзину
          </div>
        )}
        {items.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}

        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего пицц: <b>{itemsCount} шт.</b>
            </span>
            <span>
              Сумма заказа: <b>{itemsPrice} ₽</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
