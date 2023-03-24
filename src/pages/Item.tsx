import React, {useState} from 'react';
import { useParams } from 'react-router';
import {CATALOG_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE} from '../utils/consts';
import {useDispatch, useSelector} from "react-redux";
import gr from '../static/gr.svg'
import lit from '../static/lit.svg'
import {Link} from "react-router-dom";
import {addItem} from "../store/cart/cartSlice";
import AddToCartModal from '../components/modals/AddToCartModal';
import {selectItemData} from "../store/items/selectors";
import ItemsType from "../types/items-type";
import Page404 from "./Page404";


const Item = () => {

  const [descActive, setDescActive] = useState(true)
  const [charActive, setCharActive] = useState(true)
  const {code} = useParams()
  const {items} = useSelector(selectItemData)
  const dispatch = useDispatch()

  const [addToCartVisible, setAddToCartVisible] = useState(false);
  const [curCount, setCurCount] = useState(1)

  const minus = () => {
    if(curCount>1) setCurCount(() => curCount-1)
  }

  const item = items.filter((i) => i.code === code)

  if(!item.length) return <Page404/>

  const addItemToCart = (i:ItemsType) => {
    dispatch(addItem({...i, count: curCount}));
    setAddToCartVisible(() => true)
    setCurCount(() => 1)
  };

  return (
    <div>
      {items.map(i =>
        i.code===code &&
        <div key = {code}>
          <div className="breadcrumbs">
            <Link to={SHOP_ROUTE} className={"crumb__early"}> Главная </Link>
            &#62;
            <Link to={CATALOG_ROUTE} className={"crumb__early"} > Каталог </Link>
            &#62;
            <Link to={`${PRODUCT_ROUTE}/${code}`} className={"crumb__now"}> {i.name} </Link>
          </div>
          <img src={i.url} style={{"height": "400px"}} alt="product"/>
          <div className="info">
            <p>{i.seller} {i.brand.toUpperCase()} {i.name}</p>
            <p>
              <img src={i.type==="weight" ? gr : lit} alt=""/>
              {i.size}
              {i.type==="weight" ? " г" : " мл"}
            </p>
            <div>
              {i.price}

              <div>
                <button onClick={() => setCurCount(() => curCount+1)}>+</button>
                {curCount}
                <button onClick={() => minus()}>-</button>
              </div>

              <button onClick={() => addItemToCart(i)}>
                В корзину
              </button>
            </div>
            <div className="share">
              <button>share</button>
              <p>При покупке от 10 000 т бесплатная доставка по Какчетаву и области</p>
              <p>Прайс-лист</p>
            </div>
            <p>Производитель: {i.seller}</p>
            <p>Бренд: {i.brand}</p>
            <p>Артикул: {i.code.slice(0, 5)}</p>
            <p>Штрихкод: {i.code}</p>

            <button onClick={() => setDescActive(() => !descActive)}>
              Описание
            </button>
            <p>
              {!descActive && i.desc}
            </p>
            <hr/>
            <button  onClick={() => setCharActive(() => !charActive)}>
              Характеристики
            </button>
            {!charActive && (
              <>
                <p>Производитель: {i.seller}</p>
                <p>Бренд: {i.brand}</p>
                <p>Артикул: {i.code.slice(0, 5)}</p>
                <p>Кол-во в коробке: 1</p>
                <p>Штрихкод: {i.code}</p>
                <p>Размеры коробки: 10x10x10</p>
                <p>Вес коробки: {i.size} {i.type==="weight" ? " г" : " мл"} </p>
              </>
            )}

          </div>
        </div>
      )}
      <AddToCartModal show={addToCartVisible} onHide={() => setAddToCartVisible(false)} />
    </div>
  );
};

export default Item;
