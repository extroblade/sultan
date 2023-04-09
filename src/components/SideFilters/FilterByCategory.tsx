import React, {useEffect} from 'react';
import styles from "./SideFilters.module.css";
import {Categories} from "../../store/items/itemsTypes";
import {setCategories, sortCat} from "../../store/items/itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";



const FilterByCategory = () => {
  const { categories, currentCat } = useSelector(selectItemData);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(sortCat())
  },[currentCat])

  return (
    <div className={styles.categories}>
      {categories.map((c: Categories) =>
        <div className={styles.categories__btns} key={c.name}>
          <div className={`${styles.hl} ${styles.pc}`}/>
          <button
            onClick={() => currentCat === c.name ? dispatch(setCategories("")) : dispatch(setCategories(c.name))}
            className={c.name===currentCat ? styles.type__current : styles.type}
          >
            {c.name.toUpperCase()}
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterByCategory;
