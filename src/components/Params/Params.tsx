import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";
import {setCategories, sortCat} from '../../store/items/itemsSlice';

import styles from './Params.module.css'

import {ReactComponent as ArrowUpIcon} from "../../static/arrow_up.svg";
import {ReactComponent as ArrowDownIcon} from "../../static/arrow_down.svg";

import {Categories} from "../../store/items/itemsTypes";
import AllSorts from "./AllSorts";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

export interface iFilters {
  key: string;
  value: number[] | string;
}

const Params = () => {
  const { filters, categories, currentCat } = useSelector(selectItemData);

  const dispatch = useDispatch()

  const [cat, setCat] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(()=>{
    dispatch(setCategories(cat))
    dispatch(sortCat())
    setMobileOpen(() => false)
  },[cat])

  useEffect(()=>{
    setMobileOpen(() => false)
  },[filters])


  const open = () => {
    setMobileOpen(() => !mobileOpen)
  }

  if (mobileOpen) return (
    <div className={`${styles.params}`}>
      <div className={styles.open_modal}>

        <Breadcrumbs/>

        <h2 className={styles.mobile}>Косметика и гигиена</h2>

        <h4>
          ПОДБОР ПО ПАРАМЕТРАМ
          <button className={styles.mobile} onClick={open}>
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
        <button className={styles.mobile} onClick={open}>
          <ArrowDownIcon/>
        </button>
      </h4>

      <span className={styles.pc}><AllSorts/></span>

      <div className={styles.categories}>
        {categories.map((c: Categories) =>
          <div className={styles.categories__btns} key={c.name}>
            <div className={`${styles.hl} ${styles.pc}`}></div>
            <button
              onClick={() => currentCat === c.name ? setCat("") : setCat(c.name)}
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

export default Params;
