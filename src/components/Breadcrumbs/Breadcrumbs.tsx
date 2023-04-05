import React, {useEffect} from 'react';
import styles from "./Breadcrumbs.module.css";
import {Link} from "react-router-dom";
import {CATALOG_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {ReactComponent as LeftArrow} from "../../static/leftarrow.svg";
import {useLocation} from "react-router";
import {useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";
import {getItemsFromAdmin} from "../../utils/functions";

const Breadcrumbs = () => {
  const location = useLocation();
  const { currentCat, filters, currentPage } = useSelector(selectItemData);
  const i = [...getItemsFromAdmin()].find((item) => item.code === location.pathname.split('/')[2])

  const getPage = () => {
    switch (location.pathname){
      case "/cart": return "Корзина"
      case "/catalog": return "Каталог"
      case "/admin": return "Админка"
      default: return "Султан"
    }
  }

  useEffect(()=>{
    (currentCat && location.pathname === '/catalog')
      ? document.title = `${currentCat}`
      : document.title = getPage();
    window.scrollTo(0,0)
  },[location, currentCat, filters, currentPage])

  return (
    <>
      <div className={`${styles.breadcrumbs} ${styles.mobile}`}>
        <Link to={SHOP_ROUTE} className={styles.breadcrumb}>
          <div className={styles.arrow}>
            <LeftArrow/>
          </div>
          <span>Назад</span>
        </Link>
      </div>

      {location.pathname.split('/')[2] ?
        <div className={`${styles.breadcrumbs} ${styles.pc}`}>
          <Link to={SHOP_ROUTE} className={styles.breadcrumb}> Главная </Link>
          <div className={styles.vl}/>
          <Link to={CATALOG_ROUTE} className={styles.breadcrumb}> Каталог </Link>
          <div className={styles.vl}/>
          <Link to={CATALOG_ROUTE} className={`${styles.breadcrumb} ${styles.active}`}>
            {i.name[0].toUpperCase()}{i.name.substring(1, i.name.length)}
          </Link>
        </div>
        :
        location.pathname!=='/' &&
          <div className={`${styles.breadcrumbs} ${styles.pc}`}>
            <Link to={SHOP_ROUTE} className={styles.breadcrumb}> Главная </Link>
            <div className={styles.vl}/>
            <Link to={"#"} className={`${styles.breadcrumb} ${styles.active}`}>
              {`${ getPage()}`}
            </Link>
          </div>
      }
    </>
  );
};

export default Breadcrumbs;
