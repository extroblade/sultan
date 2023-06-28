import React, {FC} from 'react';
import styles from './Pagination.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {selectItemData} from '../../store/items/selectors';
import {ReactComponent as LeftArrow} from '../../static/leftarrow.svg';
import {ReactComponent as RightArrow} from '../../static/rightarrow.svg';
import {calcTotalAmount} from '../../utils/functions';
import {setCurrentPage} from '../../store/items/itemsSlice';

const Pagination: FC = () => {
  const {items, limit, currentPage} = useSelector(selectItemData);
  const dispatch = useDispatch();

  const count = Math.ceil(calcTotalAmount(items) / limit);
  const pages = [];
  for (let i = 0; i < (count > 5 ? 5 : count); i++) pages.push(i + 1);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <nav className={styles.pages}>
      <ul>
        <li>
          <button
            disabled={currentPage <= 1}
            onClick={() =>
              onChangePage(currentPage > 1 ? currentPage - 1 : currentPage)
            }
          >
            <LeftArrow />
          </button>
        </li>

        {pages.map(p => (
          <li key={p}>
            <button
              onClick={() => onChangePage(p)}
              className={p === currentPage ? styles.selected : styles.list}
            >
              {p}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={currentPage >= count}
            onClick={() =>
              onChangePage(
                currentPage + 1 <= count ? currentPage + 1 : currentPage
              )
            }
          >
            <RightArrow />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
