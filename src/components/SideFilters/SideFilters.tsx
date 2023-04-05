import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";
import {setCategories, sortCat} from '../../store/items/itemsSlice';

import styles from './SideFilters.module.css'

import {ReactComponent as ArrowUpIcon} from "../../static/arrow_up.svg";
import {ReactComponent as ArrowDownIcon} from "../../static/arrow_down.svg";

import {Categories} from "../../store/items/itemsTypes";
import AllSorts from "./AllSorts";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

export interface iFilters {
  key: string;
  value: number[] | string;
}

const SideFilters = () => {
  const { filters, categories, currentCat } = useSelector(selectItemData);
  const dispatch = useDispatch()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(()=>{
    dispatch(sortCat())
    setMobileOpen(() => false)
    dispatch(setCategories(currentCat))
  },[currentCat])

  useEffect(()=>{
    setMobileOpen(() => false)
  },[filters])

  if (mobileOpen) return (
    <div className={`${styles.params} ${styles.mobile}`}>
      <div className={styles.open_modal}>
        <Breadcrumbs/>

        <h2 className={styles.mobile}>Косметика и гигиена</h2>

        <h4>
          ПОДБОР ПО ПАРАМЕТРАМ
          <button className={styles.mobile} onClick={() => setMobileOpen(false)}>
            <ArrowUpIcon/>
          </button>
        </h4>

        <AllSorts/>
      </div>
    </div>
  )

  return (
    <div className={styles.params}>
      <h4>
        ПОДБОР ПО ПАРАМЕТРАМ
        <button className={styles.mobile} onClick={() => setMobileOpen(true)}>
          <ArrowDownIcon/>
        </button>
      </h4>

      <span className={styles.pc} data-testid={"sort"}>
        <AllSorts/>
      </span>

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
    </div>
  );
};

export default SideFilters;
