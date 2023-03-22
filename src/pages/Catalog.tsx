import React, {FC, useCallback, useEffect} from 'react';
import {CATALOG_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE} from "../utils/consts";
import Pagination from "../components/Pagination/Pagination";
import type {} from 'redux-thunk/extend-redux';
import {Link, useNavigate} from "react-router-dom";
import Products from '../components/Products';
import Filters from '../components/Filters';
import Params from '../components/Params';
import {useSelector} from "react-redux";
import {selectFilter} from "../store/filters/selectors";
import { setCategoryId, setCurrentPage } from '../store/filters/filterSlice';
import {useAppDispatch} from "../store";
import { selectItemData } from '../store/items/selectors';


const Catalog: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const { items, status } = useSelector(selectItemData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  return (
    <div>
      <div className="breadcrumbs">
        <Link to={SHOP_ROUTE} className={"crumb"}>Главная </Link>
        &#62;
        <Link to={CATALOG_ROUTE} className={"crumb crumb__now"}> Каталог </Link>
      </div>
      <h2>Косметика и гигиена</h2>
      Сортировка: список (название цена) Вид --- [][][]
      <Filters/>
      <div style={{"display":"flex", "flexDirection":"row"}}>
        <Params/>
        <Products/>
      </div>
      <div style={{"display":"flex", "flexDirection":"row"}}>
        <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
      </div>


    </div>

  );
};

export default Catalog;
