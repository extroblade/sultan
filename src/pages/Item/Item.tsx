import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import {CART_ROUTE} from '../../utils/consts';
import {useDispatch, useSelector} from "react-redux";

import {Link} from "react-router-dom";
import {addItem} from "../../store/cart/cartSlice";
import {selectItemData} from "../../store/items/selectors";
import Page404 from "../Page404";
import { ReactComponent as GrIcon } from "../../static/gr.svg";
import { ReactComponent as CartIcon } from "../../static/cart.svg";
import { ReactComponent as LitIcon } from '../../static/lit.svg';
import { ReactComponent as ShareIcon } from '../../static/share.svg';
import { ReactComponent as DownloadIcon } from '../../static/download.svg';
import styles from "./Item.module.css"
import Modal from "../../components/modals/Modal";
import {ItemsType} from "../../store/items/itemsTypes";
import Chars from "../../components/ItemComponents/Chars";
import Descriptions from "../../components/ItemComponents/Descriptions";

const Item = () => {
  const {code} = useParams()
  const {items} = useSelector(selectItemData)
  const dispatch = useDispatch()

  const [addToCartVisible, setAddToCartVisible] = useState(false);
  const [curCount, setCurCount] = useState(1)

  const minus = () => {
    if(curCount>1) setCurCount(() => curCount-1)
  }

  const i = items.find((item) => item.code === code)

  useEffect(()=>{
    (i)
    ? document.title = `${i.name[0].toUpperCase()}${i.name.substring(1, i.name.length)}`
    : document.title = `Товар не найден...`
  },[code, i])

  if(!i) return <Page404/>

  const addItemToCart = (i:ItemsType) => {
    dispatch(addItem({...i, count: curCount}));
    setAddToCartVisible(() => true)
    setCurCount(() => 1)
  };

  return (
    <div className={styles.item} onClick={() => setAddToCartVisible(false)}>
      <div className={`${styles.row} ${styles.item__page}`}>
        <div className={styles.col}>
          <div className={styles.item__img}>
            <img src={i.url} alt="product"/>
          </div>
        </div>
        <div className={`${styles.col} ${styles.right__side}`}>
          <div className={styles.info}>
            <p className={styles.available}>В наличии</p>
            <p className={styles.item__name}>
              <strong>{i.seller} {i.brand.toUpperCase()}</strong> {i.name}
            </p>

            <p className={`${styles.size} ${styles.pc}`}>
              {i.type==="weight" ? <GrIcon/> : <LitIcon/>}
              {`  ${i.size}`}
              {i.type==="weight" ? " г" : " мл"}
            </p>
            <div className={styles.row}>
              <div className={styles.price__info}>
                <p className={styles.price}>
                  {i.price} &#8376;
                </p>

                <div className={styles.amount__container}>
                  <button onClick={() => minus()} className={styles.amount}>-</button>
                  <span>{curCount}</span>
                  <button onClick={() => setCurCount(() => curCount+1)} className={styles.amount}>+</button>
                </div>
              </div>
              <div className={styles.share} onClick={e => e.stopPropagation()}>
                <button onClick={() => addItemToCart(i)} className={styles.btn__text}>
                  <span>В корзину</span>
                  <CartIcon/>
                </button>
                <button className={`${styles.item__card} ${styles.mobile}`}>
                  <ShareIcon/>
                </button>
              </div>
            </div>

            <div className={styles.item__btns}>
              <button className={`${styles.item__card} ${styles.pc}`}>
                <ShareIcon/>
              </button>
              <button className={styles.item__card}>
                При покупке от <strong>10 000 &#8376;</strong>  бесплатная доставка по Какчетаву и области
              </button>
              <button className={`${styles.item__card} ${styles.item__download}`}>
                <span>Прайс-лист</span>
                <DownloadIcon/>
              </button>
            </div>
            <div className={styles.info__container}>
              <p>Производитель: <span className={styles.item__info}>{i.seller}</span> </p>
              <p>Бренд: <span className={styles.item__info}>{i.brand}</span></p>
              <p>Артикул: <span className={styles.item__info}>{i.code.slice(0, 5)}</span></p>
              <p>Штрихкод: <span className={styles.item__info}>{i.code}</span></p>
            </div>

            <Descriptions i={i}/>
            <div className={styles.hl}></div>
            <Chars i={i}/>
          </div>
        </div>
      </div>

      <Modal show={addToCartVisible} onHide={() => setAddToCartVisible(false)}>
        <h2>Товар успешно добавлен в корзину</h2>
        <Link to={CART_ROUTE}>КОРЗИНА</Link>
      </Modal>

    </div>
  );
};

export default Item;
