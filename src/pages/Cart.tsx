import React, {FC} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearItems } from '../store/cart/cartSlice';
import { selectCart } from '../store/cart/selectors';
import CartItem from "../components/CartItem";
import {Link} from "react-router-dom";
import { CATALOG_ROUTE } from '../utils/consts';

const Cart: FC = () => {

  const dispatch = useDispatch();
  const { totalPrice, cartItems } = useSelector(selectCart);

  const clear = () => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearItems());
    }
  };

  if (!cartItems.length) return (
    <div>
      <p>No items in cart!!</p>

      <Link to={CATALOG_ROUTE}>Back to catalog</Link>
    </div>
  )

  return (
    <div>
      cart
      <button onClick={() => clear()}>
        clear cart
      </button>
      {cartItems.map(i =>
        <div key={i.code}>
          <CartItem i={i}/>
        </div>

      )}
      <p>total price is {Math.ceil(totalPrice*10)/10}</p>
    </div>
  );
};

export default Cart;
