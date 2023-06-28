import React, {FC} from 'react';
import styles from './CartItem.module.sass';
import placeholder from '../../static/placeholder.png';
import {ReactComponent as TrashIcon} from '../../static/delete.svg';
import {CIType} from './CartItem';
import {removeItem} from '../../store/cart/cartSlice';
import {useDispatch} from 'react-redux';

const NoItem: FC<CIType> = ({cart_item}) => {
  const dispatch = useDispatch();
  const {code} = cart_item;
  const remove = () =>
    window.confirm('Вы действительно хотите удалить товар?') &&
    dispatch(removeItem(code));

  return (
    <div className={styles.cart__item} key={code}>
      <p
        className={styles.cart__img}
        style={{filter: 'blur(5px)', cursor: 'default'}}
      >
        <img
          src={placeholder}
          alt="item"
          style={{width: '160px', height: '160px'}}
        />
      </p>

      <div className={styles.col}>
        <p>{code}</p>
        <p style={{cursor: 'default'}}>
          <span className={styles.cart__item__name} style={{color: 'red'}}>
            Товар недоступен
          </span>
        </p>
        <p style={{width: '450px', filter: 'blur(5px)', cursor: 'default'}}>
          Товар недоступен
        </p>
      </div>

      <span className={styles.cart__btns}>
        <div
          className={styles.cart__item__price}
          style={{filter: 'blur(5px)', cursor: 'default'}}
        >
          <button
            disabled
            className={styles.amount}
            style={{filter: 'blur(5px)', cursor: 'default'}}
          >
            -
          </button>
          <div className={styles.amount__value}>
            <span>-</span>
          </div>
          <button
            disabled
            className={styles.amount}
            style={{filter: 'blur(5px)', cursor: 'default'}}
          >
            +
          </button>
        </div>

        <div className={styles.vl}></div>
        <strong style={{filter: 'blur(5px)', cursor: 'default'}}>
          {' '}
          0 &#8376;{' '}
        </strong>

        <div className={styles.vl}></div>
        <button className={styles.btn__img} onClick={() => remove()}>
          <TrashIcon />
        </button>
      </span>
    </div>
  );
};

export default NoItem;
