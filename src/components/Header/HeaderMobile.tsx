import React, {FC, useState} from 'react';
import styles from "./Header.module.css";
import {ReactComponent as CloseIcon} from "../../static/close.svg";
import {ReactComponent as HamburgerIcon} from "../../static/hamburger-white.svg";
import {Link} from "react-router-dom";
import {CART_ROUTE, CATALOG_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import logo from "../../static/main-logo.svg";
import {ReactComponent as CatalogIcon} from "../../static/catalog.svg";
import {ReactComponent as LensIcon} from "../../static/lens.svg";
import consultant from "../../static/consultant.png";
import {ReactComponent as DownloadIcon} from "../../static/download.svg";
import {ReactComponent as CartIcon} from "../../static/cart.svg";

import BurgerModal from "../modals/BurgerModal";

interface iHeader {
  price: number,
  amount: number
}

const HeaderMobile: FC<iHeader> = ({price, amount}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.mobile} style={{flexDirection: "column"}}>
      <nav className={styles.nav}>
        <button className={styles.menu__open} onClick={() => setModalOpen(!modalOpen)}>
          {modalOpen ? <CloseIcon/> : <HamburgerIcon/>}
        </button>

        <Link to={SHOP_ROUTE} className={styles.main_logo}>
          <img src={logo} alt="Logo"/>
        </Link>

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
      <BurgerModal show={modalOpen}/>
    </div>

  );
};

export default HeaderMobile;
