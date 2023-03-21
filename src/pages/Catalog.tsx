import React, {FC, useEffect} from 'react';
import ItemsType from "../types/items-type";
import gr from '../static/gr.svg'
import lit from '../static/lit.svg'
import cart from '../static/cart.svg'
import {CATALOG_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE} from "../utils/consts";
import Pagination from "../components/Pagination";
import {useDispatch} from "react-redux";
import { useTypedSelector } from '../hooks/useTypedSelector';
import {fetchItems} from "../store/actions/item";
import type {} from 'redux-thunk/extend-redux';
import {ItemState} from "../store/types/item";
import {Link} from "react-router-dom";

const Catalog: FC = () => {
  const {items, error, loading}: ItemState = useTypedSelector(state => state.items)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  const itemsList: ItemsType[] = items

  if(loading) return <h1>Loading</h1>
  if(error) return <h1>Error</h1>

  // const [sortType, setSortType] = useState({
  //   priceUp: false,
  //   priceDown: false,
  //   nameUp: false,
  //   nameDown: false,
  // })

  return (
    <div>
      catalog
      <div className="breadcrumbs">
        <Link to={SHOP_ROUTE} className={"crumb"}>Главная </Link>
        <Link to={CATALOG_ROUTE} className={"crumb"}>Каталог </Link>
      </div>

      <div className={"items"}>
        {itemsList.map(i =>
          <div className={"item"} key={i.code} style={{"border": "1px solid black", "padding": "20px"}}>
            <Link to={PRODUCT_ROUTE+'/'+i.code}>
              <img src={i.url} alt="product" style={{"height": "150px"}}/>
              <p>
                <img src={i.type==="weight" ? gr : lit} alt="" className={"icon"}/>
                {i.size}
                {i.type==="weight" ? " г" : " мл"}
              </p>
              <p> {i.brand.toUpperCase()} {i.name} </p>
            </Link>

            <p> Штрихкод: {i.code} </p>
            <p> Производитель: {i.seller} </p>
            <p> Бренд: {i.brand.toUpperCase()} </p>
            <p>
              {i.price} &#8376;
            </p>
            <p>тип ухода (пока хз)</p>

            <button>
              В корзину
              <img src={cart} alt="add to cart"/>
            </button>
          </div>
        )}
      </div>

      <Pagination />
    </div>
  );
};

export default Catalog;
