import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {addItem, minusItem, removeItem} from '../../store/cart/cartSlice';
import {CartItem as CartItemType} from '../../store/cart/types';
import {PRODUCT_ROUTE} from '../../utils/consts';
import styles from './CartItem.module.sass';
import {ReactComponent as GrIcon} from '../../static/gr.svg';
import {ReactComponent as LitIcon} from '../../static/lit.svg';
import {ReactComponent as TrashIcon} from '../../static/delete.svg';
import {getItemsFromAdmin} from '../../utils/functions';
import NoItem from './NoItem';
import {ItemsType} from '../../store/items/itemsTypes';

export interface CIType {
  cart_item: CartItemType;
}

const CartItem: FC<CIType> = ({cart_item}) => {
  const dispatch = useDispatch();

  const remove = () =>
    window.confirm('Вы действительно хотите удалить товар?') &&
    dispatch(removeItem(cart_item.code));
  const item = getItemsFromAdmin().find(
    (item: ItemsType) => item.code === cart_item.code
  );

  const {code, url, size, name, brand, desc, count, type} = item;

  if (!item) return <NoItem cart_item={cart_item} />;

  return (
    <div className={styles.cart__item} key={code}>
      <Link to={PRODUCT_ROUTE + '/' + code} className={styles.cart__img}>
        <img src={url} alt="item" />
      </Link>

      <div className={styles.col}>
        <p className={styles.size}>
          {type === 'weight' ? (
            <>
              {' '}
              <GrIcon /> {size} г{' '}
            </>
          ) : (
            <>
              {' '}
              <LitIcon /> {size} мл{' '}
            </>
          )}
        </p>

        <Link to={PRODUCT_ROUTE + '/' + code}>
          <span className={styles.cart__item__name}>
            {brand} {name.length >= 35 ? `${name.substring(0, 35)}...` : name}
          </span>
        </Link>

        <p className={styles.desc}>
          {desc.length >= 150 ? `${desc.substring(0, 150)}...` : desc}
        </p>
      </div>

      <span className={styles.cart__btns}>
        <div className={styles.cart__item__price}>
          <button
            onClick={() => (count > 1 ? dispatch(minusItem(code)) : remove())}
            className={styles.amount}
          >
            {' '}
            -{' '}
          </button>

          <div className={styles.amount__value} data-testid={'amount' + code}>
            {count}
          </div>

          <button
            onClick={() => dispatch(addItem({...cart_item, count: 1}))}
            className={styles.amount}
            data-testid={'plus' + code}
          >
            {' '}
            +{' '}
          </button>
        </div>

        <div className={styles.vl} />
        <strong> {count * item.price} &#8376; </strong>

        <div className={styles.vl} />
        <button className={styles.btn__img} onClick={remove}>
          <TrashIcon />
        </button>
      </span>
    </div>
  );
};

export default CartItem;
