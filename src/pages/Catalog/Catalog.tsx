import React, {useEffect} from 'react';
import {CATALOG_ROUTE} from "../../utils/consts";
import Pagination from "../../components/Pagination/Pagination";
import Filters from '../../components/Filters/Filters';
import Params from '../../components/Params/Params';
import {useSelector} from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import {selectItemData} from "../../store/items/selectors";
import ItemsType from "../../types/items-type";

import styles from "./Catalog.module.css"

import "../../components/styles/styles.css"
import {setCurrentPage, sortPriceASC} from '../../store/items/itemsSlice';
import { useDispatch } from 'react-redux';

const Catalog = () => {
  const dispatch = useDispatch()
  const { limit, items, currentPage} = useSelector(selectItemData);

  const itemsList: ItemsType[] = items.slice(limit*(currentPage-1), limit*(currentPage))

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(()=>{
    dispatch(sortPriceASC())
  },[])


  return (
    <div className={styles.catalog}>

      <h2 className={styles.mobile}>Косметика и гигиена</h2>

      <span className={`${styles.pc} ${styles.filt}`}><Filters/></span>

      <div className={styles.main__content}>
        <Params/>
        <span className={styles.mobile}><Filters/></span>

        <span className={styles.items__container}>
          <div className={styles.items__grid}>
            {itemsList.length ? itemsList.map((i) =>
                <ProductCard i={i} key={i.code}/>
              ):
              <div>
                <p>Нет товаров, соответствующих выбранным фильтрам,</p>
                <a href={CATALOG_ROUTE}>Вернуться в каталог</a>
              </div>
            }
          </div>

          {items.length ? <Pagination currentPage={currentPage} onChangePage={onChangePage}/> : ""}

          <div className={styles.description}>
            <p>
              Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
              Nullam interdum ut justo,
              vestibulum sagittis iaculis iaculis.
              Quis mattis vulputate feugiat massa vestibulum duis.
              Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis.
              Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.
            </p>
          </div>

        </span>

      </div>

    </div>
  );
};

export default Catalog;

