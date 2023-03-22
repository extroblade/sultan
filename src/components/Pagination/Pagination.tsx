import React from 'react';

import ReactPaginate from "react-paginate";
import styles from './Pagination.module.css';
import ItemsType from "../../types/items-type";
import {useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  const countAmount = (arr: ItemsType[]): number => arr.reduce((a) => a+1, 0)
  const { items, limit } = useSelector(selectItemData);


  const count = Math.ceil(countAmount(items)/limit)

  return (
    <ReactPaginate
      breakLabel="..."
      className={styles.root}
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={count>3 ? 4 : count}
      pageCount={count}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
