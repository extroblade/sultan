import React, { FC } from 'react';
import ItemsType from "../../types/items-type";
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../utils/consts";


import { ReactComponent as GrIcon } from "../../static/gr.svg";
import { ReactComponent as LitIcon } from '../../static/lit.svg';
import { ReactComponent as CartIcon } from "../../static/cart.svg";

import styles from './ProductCard.module.css'
import {useSelector} from "react-redux";
import {selectCartItemById} from "../../store/cart/selectors";
import { CartItem } from '../../store/cart/types';
import {addItem} from "../../store/cart/cartSlice";
import { useDispatch } from 'react-redux';

interface IType {
  i: ItemsType
}

const ProductCard: FC<IType> = ({i}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(i.code));

  const addedCount = cartItem ? cartItem.count : 0;
  const AddToCart = () => {
    const item: CartItem = {
      url: i.url,
      name: i.name,
      type: i.type,
      size: i.size,
      code: i.code,
      seller: i.seller,
      brand: i.brand,
      desc: i.desc,
      price: i.price,
      count: 0,
    };
    dispatch(addItem(item));
  };


  return (
    <div className={styles.item} key={i.code}>
      <Link to={PRODUCT_ROUTE+'/'+i.code}>
        <img src={i.url} alt="product" className={styles.img}/>
        <p>
          {i.type==="weight" ? <GrIcon/> : <LitIcon/>}
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

      <button onClick={() => AddToCart()}>
        В корзину
        <CartIcon/>
      </button>
    </div>
  );
};

export default ProductCard;
