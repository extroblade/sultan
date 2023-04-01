import React, {useEffect, useState} from 'react';
import styles from './Header.module.css'
import consultant from '../../static/consultant.png'
import logo from '../../static/main-logo.svg';

import { ReactComponent as LensIcon } from '../../static/lens.svg';
import { ReactComponent as CatalogIcon } from '../../static/catalog.svg';
import { ReactComponent as AddressIcon } from '../../static/address.svg';
import { ReactComponent as EmailIcon } from '../../static/email.svg';
import { ReactComponent as DownloadIcon } from '../../static/download.svg';
import { ReactComponent as CartIcon } from '../../static/cart.svg';
import { ReactComponent as HamburgerIcon } from '../../static/hamburger-white.svg';

import {ADMIN_ROUTE, CART_ROUTE, CATALOG_ROUTE, SHOP_ROUTE} from '../../utils/consts';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCart} from "../../store/cart/selectors";
import {CartItem} from "../../store/cart/types";
import {setTotalPrice} from "../../store/cart/cartSlice";
import {selectItemData} from "../../store/items/selectors";
import BurgerModal from "../modals/BurgerModal";


const Header = () => {
  const { totalPrice, cartItems } = useSelector(selectCart);
  const { items } = useSelector(selectItemData);
  const dispatch = useDispatch()
  const countAmount = (it: CartItem[]): number => {
    return  it.reduce((i, next) => i+next.count,0)
  }
  const [modalOpen, setModalOpen] = useState(false);


  const [amount, setAmount] = useState(0)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    setAmount(() => countAmount(cartItems));
    setPrice(() => (Math.ceil(totalPrice*10)/10))
    dispatch(setTotalPrice())
  }, [dispatch, cartItems, totalPrice, items])


  return (
    <header className={styles.header}>
      <div className={styles.head}>
        <div className={styles.contact}>
          <div className={styles.contact__container}>
            <AddressIcon/>
            <p>
              <strong>г.Кокчетав, ул.Ж. Ташенова 129Б</strong><br/>
              (Рынок Восточный)
            </p>
          </div>
          <div className={styles.vl}></div>
          <div className={styles.contact__container}>
            <EmailIcon/>
            <p>
              <strong>opt.sultan@mail.ru</strong><br/>
              На связи в любое время
            </p>

          </div>
        </div>
        <ul className={styles.navigation}>
          <li className={`${styles.navigation__item} ${styles.admin}`} style={{marginRight: "20px"}}>
            <Link to={ADMIN_ROUTE}>Админка</Link>
          </li>

          <li className={styles.navigation__item}>
            <Link to={"#"}>О компании</Link>
          </li>
          <div className={styles.vl}></div>
          <li className={styles.navigation__item}>
            <Link to={"#"}>Доставка и оплата</Link>
          </li>
          <div className={styles.vl}></div>
          <li className={styles.navigation__item}>
            <Link to={"#"}>Возврат</Link>
          </li>
          <div className={styles.vl}></div>
          <li className={styles.navigation__item}>
            <Link to={"#"}>Контакты</Link>
          </li>
        </ul>
      </div>

      <nav className={styles.nav}>
        <button className={styles.menu__open} onClick={() => setModalOpen(true)}>
          <HamburgerIcon/>
        </button>

        <Link to={SHOP_ROUTE} className={styles.main_logo}>
          <img src={logo} alt="Logo"/>
        </Link>

        <div className={styles.col}>
          <Link to={CATALOG_ROUTE} className={styles.btn__text}>
            <span>Каталог</span>
            <CatalogIcon/>
          </Link>
        </div>

        <div className={`${styles.col} ${styles.input}`}>
          <input type={"search"} placeholder={"Поиск..."}/>
          <button type={"submit"} className={`${styles.btn} ${styles.btn__img}`}>
            <LensIcon/>
          </button>
        </div>

        <div className={styles.header__call}>
          <strong className={styles.header__call__item}>+7 (777) 490-00-91</strong>
          <p className={styles.header__call__item}>время работы: 9:00-20:00</p>
          <a className={styles.header__call__item}>Заказать звонок</a>
        </div>

        <div className={`${styles.col} ${styles.nav__img}`}>
          <img src={consultant} alt="consultant"/>
        </div>

        <div className={styles.col}>
          <button className={styles.btn__text}>
            <span>Прайс-лист</span>
            <DownloadIcon/>
          </button>
        </div>

        <div className={styles.cart}>
          <Link to={CART_ROUTE} className={styles.btn__cart}>
            <CartIcon/>
            <p className={`${styles.btn__indicator}`}>{amount}</p>
          </Link>

          <div className={styles.col}>
            <Link to={CART_ROUTE}>Корзина</Link>
            <strong> {price < 1000000 ? +price : `${String(price).substring(0, 6)}...`} &#8376; </strong>
          </div>
        </div>

      </nav>
      <div className={styles.mobile}>
        <div className={styles.mobile__btn}>
          <Link to={CATALOG_ROUTE} className={`${styles.mobile__link}`}>
            <CatalogIcon className={styles.mobile__img}/>
            <p>Каталог</p>
          </Link>
        </div>
        <div className={`${styles.mobile} ${styles.vl}`}></div>
        <div className={styles.mobile__btn}>
          <Link to={"#"} className={`${styles.mobile__link}`}>
            <LensIcon className={styles.mobile__img}/>
            <p>Поиск</p>
          </Link>
        </div>
      </div>
      <BurgerModal show={modalOpen} onHide={() => setModalOpen(false)}/>
    </header>
  );
};

export default Header;
