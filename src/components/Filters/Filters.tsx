import React, {useEffect, useState} from 'react';
import {
  setCategories,
  sortCat,
  sortPriceASC,
  sortPriceDESC,
  sortTitleASC,
  sortTitleDESC
} from "../../store/items/itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";
import styles from './Filters.module.css'



const Filters = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector(selectItemData);
  const [cat, setCat] = useState("")

  useEffect(()=>{
    dispatch(setCategories(cat))
    dispatch(sortCat())
    window.scrollTo(0, 0)
  },[cat])

  return (
    <div className={styles.filters}>
      <div className={styles.filters__top}>
        <h2>Косметика и гигиена</h2>
        <div className={"sort"}>
          <button onClick={() => dispatch(sortPriceASC())}> Цена &#9650; </button>
          <button onClick={() => dispatch(sortPriceDESC())}> Цена &#9660; </button>
          <button onClick={() => dispatch(sortTitleDESC())}> Название &#9650; </button>
          <button onClick={() => dispatch(sortTitleASC())}> Название &#9660; </button>
        </div>
      </div>

      <div className={styles.categories__row}>
        {categories.length > 11 ? [categories.splice(0, 10)].map((c: any) =>
          <div key={c.name}>
            <button onClick={() => setCat(c.name)} className={styles.categories__card}>
              {c.name}
            </button>
          </div>
        ):
          [...categories].map((c: any) =>
            <div key={c.name}>
              <button onClick={() => setCat(c.name)} className={styles.categories__card}>
                {c.name}
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Filters;
