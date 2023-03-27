import React, {FC} from 'react';
import {CATALOG_ROUTE, SHOP_ROUTE} from "../utils/consts";
import Pagination from "../components/Pagination/Pagination";
import {Link} from "react-router-dom";
import Filters from '../components/Filters/Filters';
import Params from '../components/Params/Params';
import {useSelector} from "react-redux";
import {selectFilter} from "../store/filters/selectors";
import { setCurrentPage } from '../store/filters/filterSlice';
import {useAppDispatch} from "../store";
import ProductCard from "../components/ProductCard/ProductCard";
import {selectItemData} from "../store/items/selectors";
import ItemsType from "../types/items-type";

import "../components/styles/styles.css"

const Catalog: FC = () => {
  const dispatch = useAppDispatch()
  const { currentPage } = useSelector(selectFilter);
  const { limit, items} = useSelector(selectItemData);

  const itemsList: ItemsType[] = items.slice(limit*(currentPage-1), limit*(currentPage))

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div style={{"padding": "20px 16vw"}}>
      <div className="breadcrumbs">
        <Link to={SHOP_ROUTE} className={"crumb"}> Главная </Link>
        <span className="{styles.vl}">v</span>
        <Link to={CATALOG_ROUTE} className={"crumb"}> Каталог </Link>
      </div>

      <Filters/>

      <div style={{"display":"flex", "flexDirection":"row", justifyContent: "space-between"}}>
        <Params/>
        <span style={{display:"flex", flexDirection:"column"}}>
          <div className={"items"} style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(1, 1fr)",
            gridColumnGap: "10px",
            rowGap: "20px"
          }}>
            {itemsList.length ? itemsList.map((i) =>
                <ProductCard i={i} key={i.code}/>
              ):
              <div>
                no items
              </div>
            }
          </div>

          <div style={{"display":"flex", "flexDirection":"row", justifyContent: "center"}}>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
          </div>
        </span>


      </div>

    </div>
  );
};

export default Catalog;

