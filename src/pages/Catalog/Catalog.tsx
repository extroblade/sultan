import React from 'react';
import {CATALOG_ROUTE} from "../../utils/consts";
import Pagination from "../../components/Pagination/Pagination";
import TopFilters from '../../components/TopFilters/TopFilters';
import SideFilters from '../../components/SideFilters/SideFilters';
import {useSelector, useDispatch} from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import {selectItemData} from "../../store/items/selectors";

import styles from "./Catalog.module.css"

import {setCurrentPage} from '../../store/items/itemsSlice';
import {ItemsType} from "../../store/items/itemsTypes";

const Catalog = () => {
  const dispatch = useDispatch()
  const { limit, items, currentPage } = useSelector(selectItemData)

  const itemsList: ItemsType[] = [...items].slice(limit*(currentPage-1), limit*(currentPage))

  return (
    <div className={styles.catalog}>
      <h2 className={styles.mobile}>Косметика и гигиена</h2>

      <span className={styles.pc}><TopFilters/></span>

      <div className={styles.main__content}>
        <SideFilters/>
        <span className={styles.mobile}><TopFilters/></span>

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

          {items.length ? <Pagination currentPage={currentPage} onChangePage={page => dispatch(setCurrentPage(page))}/> : ""}

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

