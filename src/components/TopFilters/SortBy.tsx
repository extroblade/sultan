import React from 'react';
import styles from './TopFilters.module.css';
import {sort} from '../../store/items/itemsSlice';
import {useDispatch} from 'react-redux';

const SortBy = () => {
  const dispatch = useDispatch();

  return (
    <span className={styles.filters}>
      <div className={`${styles.filters__top}`}>
        <h2 className={styles.pc}>Косметика и гигиена</h2>
        <div className={styles.sortby}>
          <span className={styles.small}>Сортировка:</span>
          <select
            onChange={event => dispatch(sort(event.target.value))}
            className={styles.sort}
          >
            <option className={styles.value__list}>
              {' '}
              Цена (сначала недорогие){' '}
            </option>
            <option className={styles.value__list}>
              {' '}
              Цена (сначала дорогие){' '}
            </option>
            <option className={styles.value__list}> Название А-Я </option>
            <option className={styles.value__list}> Название Я-А </option>
          </select>
        </div>
      </div>
    </span>
  );
};

export default SortBy;
