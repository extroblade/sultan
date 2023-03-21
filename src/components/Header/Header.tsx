import React, {useEffect, useState} from 'react';
import styles from './Header.module.css'
import ItemsType from "../../types/items-type";

import email from '../../static/email.svg'
import address from '../../static/address.svg'
import mainLogo from '../../static/main-logo.svg'
import catalog from '../../static/catalog.svg'
import consultant from '../../static/consultant.png'
import download from '../../static/download.svg'
import cart from '../../static/cart.svg'
import lens from '../../static/lens.svg'
import {CART_ROUTE, CATALOG_ROUTE, SHOP_ROUTE} from '../../utils/consts';
import {Link} from "react-router-dom";
import {ItemState} from "../../store/types/item";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {fetchItems} from "../../store/actions/item";


const Header = () => {
  const { items }: ItemState = useTypedSelector(state => state.items)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  const [amount, setAmount] = useState(0)
  const [price, setPrice] = useState(0)

  const countAmount = (arr: ItemsType[]): number => arr.reduce((a) => a+1, 0)
  const countPrice = (arr: ItemsType[]): number => arr.reduce((a,b) => a+b.price, 0)

  useEffect(() => { //change to cart items
    setAmount(() => countAmount(items))
    setPrice(() => Math.round(countPrice(items)))
  }, [items])

  return (
    <header className={styles.header}>
      <div className={styles.head}>
        <div className={styles.contact}>
          <img src={address} alt="address"/>
          <div className={styles.contact__address}>
            <strong>г.Кокчетав, ул.Ж. Ташенова 129Б</strong>
            <p>(Рынок Восточный)</p>
          </div>
          <img src={email} alt="email"/>
          <div className={styles.contact__email}>
            <strong>opt.sultan@mail.ru</strong>
            <p>На связи в любое время</p>
          </div>
        </div>
        <ul className={styles.navigation}>
          <li className={styles.navigation__item}>
            <Link to={"#"}>О компании</Link>
          </li>

          <li className={styles.navigation__item}>
            <Link to={"#"}>Доставка и оплата</Link>
          </li>

          <li className={styles.navigation__item}>
            <Link to={"#"}>Возврат</Link>
          </li>

          <li className={styles.navigation__item}>
            <Link to={"#"}>Контакты</Link>
          </li>
        </ul>
      </div>

      <nav className={styles.nav}>
        <Link to={SHOP_ROUTE} className="logo">
          <img src={mainLogo} alt="main-logo"/>
        </Link>

        <Link to={CATALOG_ROUTE} className={`${styles.btn} ${styles.btn__text}`}>
          <p>Каталог</p>
          <img src={catalog} alt="catalog"/>
        </Link>

        <div className={styles.col}>
          <input type="text" placeholder={"Поиск..."}/>
          <button className={`${styles.btn} ${styles.btn__img}`}>
            <img src={lens} alt=""/>
          </button>
        </div>

        <div className={styles.col}>
          <strong>+7 (777) 490-00-91</strong>
          <p>время работы: 9:00-20:00</p>
          <p>Заказать звонок</p>
        </div>

        <div className={styles.nav__img}>
          <img src={consultant} alt="consultant"/>
        </div>

        <button className={`${styles.btn} ${styles.btn__text}`}>
          <p>Прайс-лист</p>
          <img src={download} alt="download"/>
        </button>

        <Link to={CART_ROUTE} className={styles.btn__cart}>
          <img src={cart} alt=""/>
          <p className={`${styles.btn} ${styles.btn__indicator}`}>{amount}</p>
        </Link>

        <div className={styles.col}>
          <Link to={CART_ROUTE}>Корзина</Link>
          <strong>{price} тенге</strong>
        </div>

      </nav>
    </header>
  );
};

export default Header;
