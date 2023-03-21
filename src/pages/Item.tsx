import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import {CATALOG_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE} from '../utils/consts';
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {fetchItems} from "../store/actions/item";
import {ItemState} from "../store/types/item";
import gr from '../static/gr.svg'
import lit from '../static/lit.svg'
import {Link} from "react-router-dom";


const Item = () => {
  const {code} = useParams()
  const {items }: ItemState = useTypedSelector(state => state.items)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  return (
    <div>
      {items.map(i =>
        i.code===code &&
        <div key = {code}>
          price = {i.price}
          item with code: {code}
          <div className="breadcrumbs">
            <Link to={SHOP_ROUTE} className={"crumb__early"}>Главная </Link>
            <Link to={CATALOG_ROUTE} className={"crumb__early"} >Каталог </Link>
            <Link to={`${PRODUCT_ROUTE}/${code}`} className={"crumb__now"}>{i.name} </Link>
          </div>
          <img src={i.url} style={{"height": "400px"}} alt="product"/>
          <div className="info">
            <p>{i.seller} {i.brand.toUpperCase()} {i.name}</p>
            <p>
              <img src={i.type==="weight" ? gr : lit} alt=""/>
              {i.size}
              {i.type==="weight" ? " г" : " мл"}
            </p>
            <p>
              {i.price}
              -1+
              <button>
                В корзину
              </button>
            </p>
            <div className="share">
              <button>share</button>
              <p>При покупке от 10 000 т бесплатная доставка по Какчетаву и области</p>
              <p>Прайс-лист</p>
            </div>
            <p>Производитель: {i.seller}</p>
            <p>Бренд: {i.brand}</p>
            <p>Артикул: {i.code.slice(0, 5)}</p>
            <p>Штрихкод: {i.code}</p>
            <button>Описание</button>
            <p>{i.desc}</p>
            <br/>
            <button>Характеристики</button>
            <p>Производитель: {i.seller}</p>
            <p>Бренд: {i.brand}</p>
            <p>Артикул: {i.code.slice(0, 5)}</p>
            <p>Кол-во в коробке: 1</p>
            <p>Штрихкод: {i.code}</p>
            <p>Размеры коробки: 10x10x10</p>
            <p>Вес коробки: {i.size} {i.type==="weight" ? " г" : " мл"} </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
