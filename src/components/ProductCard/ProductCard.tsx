import React, {FC} from 'react';
import ItemsType from "../../types/items-type";
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../utils/consts";

import { ReactComponent as GrIcon } from "../../static/gr.svg";
import { ReactComponent as LitIcon } from '../../static/lit.svg';
import { ReactComponent as CartIcon } from "../../static/cart.svg";

import styles from './ProductCard.module.css'
import {addItem} from "../../store/cart/cartSlice";
import { useDispatch } from 'react-redux';

interface IType {
  i: ItemsType
}

const ProductCard: FC<IType> = ({i }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.item} key={i.code}>
      <div className={styles.img__container}>
        <Link to={PRODUCT_ROUTE+'/'+i.code}>
          <img src={i.url} alt="product" className={styles.img}/>
        </Link>
      </div>

      <div className={styles.text__container}>
        <Link to={PRODUCT_ROUTE+'/'+i.code}>
          <p className={styles.size}>
            {i.type==="weight" ? <GrIcon/> : <LitIcon/>}
            {`  ${i.size}`}
            {i.type==="weight" ? " г" : " мл"}
          </p>
        </Link>

        <p className={styles.name}> <strong>{i.brand.toUpperCase()}</strong> {i.name} </p>
        <p> Штрихкод: <span>{i.code}</span> </p>
        <p> Производитель: <span>{i.seller}</span> </p>
        <p> Бренд: <span>{i.brand.toUpperCase()}</span> </p>
        <p> тип ухода <span>(пока none)</span> </p>
      </div>
      <div className={styles.bottom}>
        <strong> {Math.ceil(i.price)} &#8376; </strong>

        <button onClick={() => dispatch(addItem({...i, count: 1,}))} className={`${styles.btn} ${styles.btn__text}`}>
          <span>В корзину</span>
          <CartIcon/>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
