import React, {FC} from 'react';
import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import {CART_ROUTE, CATALOG_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {ReactComponent as Logo} from "../../static/main-logo.svg";
import {ReactComponent as CatalogIcon} from "../../static/catalog.svg";
import {ReactComponent as LensIcon} from "../../static/lens.svg";
import consultant from "../../static/consultant.png";
import {ReactComponent as DownloadIcon} from "../../static/download.svg";
import {ReactComponent as CartIcon} from "../../static/cart.svg";

interface iHeader {
  amount: number
  price: number
}
const HeaderBottom: FC<iHeader> = ({amount, price}) => {

  return (
    <nav className={styles.nav}>
      <Link to={SHOP_ROUTE} className={styles.main_logo}>
        <Logo/>
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

      <div className={styles.call}>
        <strong className={styles.header__call__item}> +7 (777) 490-00-91 </strong>
        <p className={styles.header__call__item}> время работы: 9:00-20:00 </p>
        <p className={styles.header__call__item}> Заказать звонок </p>
      </div>

      <div className={`${styles.col} ${styles.nav__img}`}>
        <img src={consultant} alt="consultant"/>
      </div>

      <div className={styles.col}>
        <Link to={"#"} className={styles.btn__text}>
          <span>Прайс-лист</span>
          <DownloadIcon/>
        </Link>
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
  );
};

export default HeaderBottom;
