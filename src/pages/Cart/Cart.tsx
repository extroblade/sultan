import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { selectCart } from '../../store/cart/selectors';
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { CATALOG_ROUTE } from '../../utils/consts';
import {clearItems} from "../../store/cart/cartSlice";
import {getCartFromLS} from "../../utils/functions";
import styles from "./Cart.module.css";
import Modal from "../../components/modals/Modal";

const Cart: FC = () => {
  const dispatch = useDispatch()
  const { totalPrice, cartItems } = useSelector(selectCart);
  const [ orderedVisible, setOrderedVisible ] = useState(false);

  useEffect(()=>{
    getCartFromLS()
  },[orderedVisible])

  if (!cartItems.length) return (
    <div style={{display: "flex", justifyContent:"center", alignItems: "center", flexDirection:"column", height: "51vh"}}>
      <p>No items in cart</p>
      <Link to={CATALOG_ROUTE}>Back to catalog</Link>
    </div>
  )

  return (
    <div className={styles.cart}>

      {cartItems.map(i =>
        <div key={i.code} className={styles.cart__items}>
          <CartItem i={i}/>
          <div className={styles.hl}></div>
        </div>
      )}

      <div className={styles.buy}>
        <button
          className={styles.btn__text}
          onClick={() => setOrderedVisible(true)
        }>
          Оформить заказ
        </button>
        <strong> {Math.ceil(totalPrice*10)/10} &#8376; </strong>
      </div>
      <Modal show={orderedVisible} onHide={() => {
        dispatch(clearItems())
        setOrderedVisible(false)
      }}>
        <h2>Спасибо за заказ</h2>
        <p>Наш менеджер свяжется с вами в ближайшее время</p>
      </Modal>
    </div>
  );
};

export default Cart;
