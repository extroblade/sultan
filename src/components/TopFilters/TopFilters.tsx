import React, {useEffect, useState} from 'react';
import {setCategories, setCurrentPage, sort, sortCat} from "../../store/items/itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";

import styles from './TopFilters.module.css'


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

  const changeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(sort(event.target.value))
  }

  return (
    <div className={styles.filters}>
      <div className={`${styles.filters__top} ${styles.pc}`}>
        <h2 className={styles.pc}>Косметика и гигиена</h2>
        <div className={styles.sortby}>
          <span className={styles.small}>Сортировка:</span>
          <select onChange={(event) => changeSort(event)} className={styles.sort}>
            <option className={styles.value__list}> Цена (сначала недорогие) </option>
            <option className={styles.value__list}> Цена (сначала дорогие) </option>
            <option className={styles.value__list}> Название А-Я </option>
            <option className={styles.value__list}> Название Я-А </option>
          </select>
        </div>
      </div>

      <div className={styles.categories__row}>
        {categories.length > 11 ? [categories.splice(0, 10)].map((c: any) =>
          <div key={c.name}>
            <button
              onClick={() => setCat(c.name)}
              className={`${styles.categories__card} ${c.name === currentCat ? styles.type__current : ""}`}
            >
              {c.name}
            </button>
          </div>
        ):
          [...categories].map((c: any) =>
            <div key={c.name}>
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
