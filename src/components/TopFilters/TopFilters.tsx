import React, {useEffect, useState} from 'react';
import {setCategories, setCurrentPage, sortCat} from "../../store/items/itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";

import styles from './TopFilters.module.css'
import {Categories} from "../../store/items/itemsTypes";
import SortBy from "./SortBy";


const TopFilters = () => {
  const dispatch = useDispatch()
  const { categories, currentCat} = useSelector(selectItemData);
  const [cat, setCat] = useState("")

  useEffect(() => {
    dispatch(setCategories(cat))
    dispatch(sortCat())
    dispatch(setCurrentPage(1))
    window.scrollTo(0, 0)
  },[cat])


  return (
    <div className={styles.filters}>
      <SortBy/>
      <div className={styles.categories__row}>
        {categories.length > 11 ? [categories.splice(0, 10)].map((c: any) =>
          <div key={c.name} data-testid={c.name}>
            <button
              onClick={() => setCat(c.name)}
              className={`${styles.categories__card} ${c.name === currentCat ? styles.type__current : ""}`}
            >
              {c.name}
            </button>
          </div>
        ):
          [...categories].map((c: Categories) =>
            <div key={c.name} data-testid={c.name}>
              <button
                onClick={() => currentCat === c.name ? setCat("") : setCat(c.name)}
                className={`${styles.categories__card} ${c.name === currentCat ? styles.type__current : ""}`}
              >
                {c.name}
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default TopFilters;
