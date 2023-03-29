import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, minusItem, removeItem } from '../../store/cart/cartSlice';
import { CartItem as CartItemType } from '../../store/cart/types';
import {PRODUCT_ROUTE} from "../../utils/consts";

import styles from "./CartItem.module.css"
import { ReactComponent as GrIcon } from "../../static/gr.svg";
import { ReactComponent as LitIcon } from '../../static/lit.svg';
import { ReactComponent as TrashIcon } from "../../static/delete.svg";
import {getItemsFromAdmin} from "../../utils/getItemsFromAdmin";


interface CIType {
  i: CartItemType
}

const CartItem: FC<CIType> = ({i}) => {
  const findItem = [...getItemsFromAdmin()].find((obj) => obj.code === i.code);

  const dispatch = useDispatch();

  const plus = () => {
    const item: CartItemType = {...i, count: 1};
    dispatch(addItem(item));
  };

  const remove = () => {
    if (window.confirm('Вы действительно хотите удалить товар?')) {
      dispatch(removeItem(i.code));
    }
  };

  const minus = () => {
    if(i.count > 1) dispatch(minusItem(i.code));
    if(i.count === 1) remove()
  };

  return (
    <div className={styles.cart__item} key={i.code}>
      <Link to={PRODUCT_ROUTE+'/'+i.code}  className={styles.cart__img}>
        <img src={i.url} alt="item"/>
      </Link>
      <div className={styles.col}>
        <p className="size">
          {i.type==="weight" ? <GrIcon/> : <LitIcon/>}
          {`  ${i.size}`}
          {i.type==="weight" ? " г" : " мл"}
        </p>
          {findItem ?
            <Link to={PRODUCT_ROUTE+'/'+i.code}>
              <span className={styles.cart__item__name}>

              {i.brand} {i.name.length >=35 ? `${i.name.substring(0, 35)}...` : i.name}
              </span>
            </Link>
            :
            <span>{i.name} Unavailable now</span>
          }
        <p style={{width:"450px"}}>{i.desc.length >=150 ? `${i.desc.substring(0, 150)}...` : i.desc}</p>
      </div>
      <span className={styles.cart__btns}>
        <div className={styles.cart__item__price}>
        <button onClick={() => minus()} className={styles.amount}>-</button>
        <div className={styles.amount__value}>
          <span>{i.count}</span>
        </div>
        <button onClick={() => plus()} className={styles.amount}>+</button>
      </div>
      <div className={styles.vl}></div>
      <strong style={{marginRight: "20px"}}> {i.count*i.price} &#8376; </strong>
      <div className={styles.vl}></div>

      <button className={styles.btn__img} onClick={() => remove()}>
        <TrashIcon/>
      </button>
      </span>

    </div>
  );
};

export default CartItem;
