import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../utils/consts";
import { ReactComponent as GrIcon } from "../../static/gr.svg";
import { ReactComponent as LitIcon } from '../../static/lit.svg';
import { ReactComponent as CartIcon } from "../../static/cart.svg";
import styles from './ProductCard.module.css'
import {addItem} from "../../store/cart/cartSlice";
import {useDispatch} from 'react-redux';
import {ItemsType} from "../../store/items/itemsTypes";
import TypeSelect from "../TypeSelect";

interface IType {
  i: ItemsType
}

const ProductCard: FC<IType> = ({i }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.item} key={i.code} data-testid={i.code}>
      <div className={styles.img__container}>
        <Link to={PRODUCT_ROUTE+'/'+i.code}>
          <img src={i.url} alt="product" className={styles.img}/>
        </Link>
      </div>

      <div className={styles.text__container}>
        <p className={styles.size}>
          {i.type==="weight" ? <GrIcon/> : <LitIcon/>}
          <span>{`${i.size}`} {i.type==="weight" ? " г" : " мл"}</span>
        </p>
        <Link to={PRODUCT_ROUTE+'/'+i.code}>
          <p className={styles.name}> <strong>{i.brand.toUpperCase()}</strong> {i.name} </p>
        </Link>
        <div className={styles.info__container}>
          <p>
            Штрихкод: <span className={styles.item__info}>
              {i.code}
            </span>
          </p>

          <p>
            Производитель: <span className={styles.item__info}>
              {i.seller}
            </span>
          </p>

          <p>
            Бренд: <span className={styles.item__info}>
              {i.brand.toUpperCase()}
            </span>
          </p>

          <TypeSelect i={i}/>
        </div>
      </div>
      <div className={styles.bottom}>
        <strong> {Math.ceil(i.price)} &#8376; </strong>

        <button
          onClick={() => dispatch(addItem({code: i.code, count: 1}))}
          className={`${styles.btn} ${styles.btn__text}`}
        >
          <span>В корзину</span>
          <CartIcon/>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
