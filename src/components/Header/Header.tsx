import React from 'react';
import styles from './Header.module.css';
import HeaderMobile from './HeaderMobile';
import {useSelector} from 'react-redux';
import {selectCart} from '../../store/cart/selectors';
import {calcCartAmount} from '../../utils/functions';
import HeaderTop from './HeaderTop';
import HeaderBottom from './HeaderBottom';

const Header = () => {
  const {totalPrice, cartItems} = useSelector(selectCart);
  const amount = calcCartAmount(cartItems);
  const price = Math.ceil(totalPrice * 10) / 10;

  return (
    <header className={styles.header}>
      <HeaderMobile amount={amount} />

      <div className={styles.header__pc}>
        <HeaderTop />
        <HeaderBottom price={price} amount={amount} />
      </div>
    </header>
  );
};

export default Header;
