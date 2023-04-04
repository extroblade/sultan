import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, minusItem, removeItem } from '../../store/cart/cartSlice';
import { CartItem as CartItemType } from '../../store/cart/types';
import { PRODUCT_ROUTE } from "../../utils/consts";

import styles from "./CartItem.module.css"
import { ReactComponent as GrIcon } from "../../static/gr.svg";
import { ReactComponent as LitIcon } from '../../static/lit.svg';
import { ReactComponent as TrashIcon } from "../../static/delete.svg";
import {getItemsFromAdmin} from "../../utils/functions";
import ItemsType from "../../types/items-type";
import NoItem from "./NoItem";

export interface CIType {
  i: CartItemType
}

const CartItem: FC<CIType> = ({i}) => {

  const dispatch = useDispatch();

  const remove = () => window.confirm('Вы действительно хотите удалить товар?') && dispatch(removeItem(i.code))

  const item = getItemsFromAdmin().find((item: ItemsType) => item.code === i.code)

  if (!item) return <NoItem i={i}/>

  return (
    <div className={styles.cart__item} key={i.code}>

      <Link to={PRODUCT_ROUTE+'/'+item.code} className={styles.cart__img}>
        <img src={item.url} alt="item"/>
      </Link>

      <div className={styles.col}>
        <p className={styles.size}>
          {item.type==="weight" ? <GrIcon/> : <LitIcon/>}
          {`  ${item.size}`}
          {item.type==="weight" ? " г" : " мл"}
        </p>
        <Link to={PRODUCT_ROUTE+'/'+i.code}>
          <span className={styles.cart__item__name}>
            {item.brand} {item.name.length >= 35 ? `${item.name.substring(0, 35)}...` : item.name}
          </span>
        </Link>
        <p className={styles.desc}>{item.desc.length >=150 ? `${item.desc.substring(0, 150)}...` : item.desc}</p>
      </div>

      <span className={styles.cart__btns}>

        <div className={styles.cart__item__price}>
          <button
            onClick={() => i.count > 1 ? dispatch(minusItem(i.code)) : remove()}
            className={styles.amount}
          > - </button>

          <div className={styles.amount__value}>
            {i.count}
          </div>

          <button
            onClick={() => dispatch(addItem({...i, count: 1}))}
            className={styles.amount}
          > + </button>
        </div>

        <div className={styles.vl}/>

        <strong> {i.count*item.price} &#8376; </strong>

        <div className={styles.vl}/>

        <button className={styles.btn__img} onClick={() => remove()}>
          <TrashIcon/>
        </button>

      </span>

    </div>
  );
};

export default CartItem;
