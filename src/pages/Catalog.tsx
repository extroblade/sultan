import React, {FC} from 'react';
import {CATALOG_ROUTE, SHOP_ROUTE} from "../utils/consts";
import Pagination from "../components/Pagination/Pagination";
import type {} from 'redux-thunk/extend-redux';
import {Link} from "react-router-dom";
import Filters from '../components/Filters';
import Params from '../components/Params';
import {useSelector} from "react-redux";
import {selectFilter} from "../store/filters/selectors";
import { setCurrentPage } from '../store/filters/filterSlice';
import {useAppDispatch} from "../store";
import ProductCard from "../components/ProductCard/ProductCard";
import {selectItemData} from "../store/items/selectors";
import ItemsType from "../types/items-type";


const Catalog: FC = () => {
  const dispatch = useAppDispatch()
  const { currentPage } = useSelector(selectFilter);
  const { limit, items} = useSelector(selectItemData);

  const itemsList: ItemsType[] = items.slice(limit*(currentPage-1), limit*(currentPage))

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
        <div className={"items"}>
          {itemsList.map((i) =>
            <ProductCard i={i} key={i.code}/>
          )}
        </div>
      </div>
      <div style={{"display":"flex", "flexDirection":"row"}}>
        <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
      </div>


    </div>

  );
};

export default Catalog;


//[{"url":"https://avatars.mds.yandex.net/get-mpic/4721581/img_id7739073593422149788.jpeg/orig","name":"средство для мытья посуды Crystal","type":"volume","size":1,"code":"4604049097546","seller":"Нэфис","brand":"AOS","desc":"asd.","price":1}]
