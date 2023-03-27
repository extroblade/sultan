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

  const changeSort = (event: any) => {
    switch (event.target.value){
      case("Цена (сначала недорогие)"): {
        dispatch(sortPriceASC());
        break
      }
      case("Цена (сначала дорогие)"): {
        dispatch(sortPriceDESC());
        break
      }
      case("Название А-Я "): {
        dispatch(sortPriceASC());
        break
      }
      case("Название Я-А"):{
        dispatch(sortTitleDESC());
        break
      }
      default: {
        dispatch(sortTitleASC());
        break;
      }
    }
  }

  // @ts-ignore
  return (
    <div className={styles.filters}>
      <div className={styles.filters__top}>
        <h2>Косметика и гигиена</h2>
        <div className={styles.sort__container}>
          <span className={styles.small}>Сортировка:</span>
          <select onChange={changeSort} className={styles.sort}>
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
