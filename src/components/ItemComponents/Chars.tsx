import React, {FC} from 'react';
import styles from '../../pages/Item/Item.module.css';
import {ItemsType} from '../../store/items/itemsTypes';
import OpenElement from './OpenElement';

interface iChars {
  i: ItemsType;
}

const Chars: FC<iChars> = ({i}) => {
  return (
    <OpenElement name={'Характеристики'}>
      <div className={styles.info__container}>
        <p>
          Назначение: <span className={styles.item__info}>{i.seller}</span>
        </p>
        <p>
          Тип:{' '}
          <span className={styles.item__info}>
            {i.type === 'weight' ? 'Вес' : 'Объем'}
          </span>
        </p>
        <p>
          Производитель: <span className={styles.item__info}>{i.seller}</span>
        </p>
        <p>
          Бренд: <span className={styles.item__info}>{i.brand}</span>
        </p>
        <p>
          Артикул:{' '}
          <span className={styles.item__info}>{i.code.slice(0, 5)}</span>
        </p>
        {i.type === 'weight' ? (
          <p>
            {' '}
            Вес: <span className={styles.item__info}> {i.size} г</span>
          </p>
        ) : (
          <p>
            {' '}
            Объем: <span className={styles.item__info}> {i.size} мл</span>
          </p>
        )}
      </div>
    </OpenElement>
  );
};

export default Chars;
