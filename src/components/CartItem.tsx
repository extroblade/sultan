import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, minusItem, removeItem } from '../store/cart/cartSlice';
import { CartItem as CartItemType } from '../store/cart/types';
import {PRODUCT_ROUTE} from "../utils/consts";
import {selectItemData} from "../store/items/selectors";

interface CIType {
  i: CartItemType
}

const CartItem: FC<CIType> = ({i}) => {
  const { items } = useSelector(selectItemData);


  const findItem = items.find((obj) => obj.code === i.code);


  const dispatch = useDispatch();

  const plus = () => {
    const item: CartItemType = {...i, count: 1};
    dispatch(addItem(item));
  };

  const remove = () => {
    if (window.confirm('Ты действительно хочешь удалить товар?')) {
      dispatch(removeItem(i.code));
    }
  };

  const minus = () => {
    if(i.count > 1) dispatch(minusItem(i.code));
    if(i.count === 1) remove()
  };

  return (
    <div className="cart_item" key={i.code}>
      <img src={i.url} alt="item"/>
      <p>{i.brand}</p>
      {findItem ?
        <Link to={PRODUCT_ROUTE+'/'+i.code}>
          {i.name}
        </Link>
        :
        <p>{i.name} Unavailable now</p>
      }

      <p>{i.desc}</p>
      <button onClick={() => plus()}>+</button>
      <p>{i.count}</p>
      <p>price of one item is {i.price}</p>
      <button onClick={() => minus()}>-</button>

      <p>price: {i.count*i.price} tenge</p>

      <button onClick={() => remove()}>
        delete item from cart
      </button>
    </div>
  );
};

export default CartItem;
