import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";
import styles from './SideFilters.module.css'
import {ReactComponent as ArrowUpIcon} from "../../static/arrow_up.svg";
import {ReactComponent as ArrowDownIcon} from "../../static/arrow_down.svg";
import AllSorts from "./AllSorts";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import FilterByCategory from "./FilterByCategory";

export interface iFilters {
  key: string;
  value: number[] | string;
}

const SideFilters = () => {
  const { filters } = useSelector(selectItemData);
  const [mobileOpen, setMobileOpen] = useState(false)

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

      <span className={styles.pc} >
        <AllSorts/>
      </span>

      <FilterByCategory/>
    </div>
  );
};

export default SideFilters;
