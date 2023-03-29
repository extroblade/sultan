import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addToLocalStorage, removeFromLocalStorage } from '../store/items/itemsSlice';
import ItemsType from "../types/items-type";
import { selectItemData } from "../store/items/selectors";
import ProductCard from '../components/ProductCard/ProductCard';

const Admin = () => {
  const dispatch = useDispatch()
  const { items, categories } = useSelector(selectItemData)

  const newItem: ItemsType = {brand: "", code: String(Date.now()), desc: "", name: "", price: 0, seller: "", size: 0, type: "", url: ""}

  const [d, setD] = useState(localStorage.getItem('items'))

  useEffect(() => {
    document.title = `Админка`;
  },[])

  useEffect(()=>{
    setD(() => localStorage.getItem('items'))
    newItem.code = String(Date.now())
  },[items, newItem])

  // const changeCat = (event: any) => {
  //   console.log(event.target.value)
  // }

  return (
    <div style={{minHeight: "50vh"}}>
      <div className="add">
        <button onClick={() => localStorage.clear()}>clear</button>
        <form onSubmit={(event) => {
          event.preventDefault()
          dispatch(addToLocalStorage(newItem))
        }}>
          <input
            type="text"
            placeholder={"picture"}
            onChange={e => newItem.url = (e.target.value)}
          />
          <input
            type="text"
            placeholder={"name"}
            onChange={e => newItem.name = (e.target.value)}
          />
          <input
            type="text"
            placeholder={"type"}
            onChange={e => newItem.type = (e.target.value)}
          />
          <input
            type="number"
            placeholder={"size"}
            onChange={e => newItem.size = +(e.target.value)}
          />
          <input
            type="text"
            placeholder={"seller"}
            onChange={e => newItem.seller = (e.target.value)}
          />
          <input
            type="text"
            placeholder={"brand"}
            onChange={e => newItem.brand = (e.target.value)}
          />
          <input
            type="text"
            placeholder={"desc"}
            onChange={e => newItem.desc = (e.target.value)}
          />
          <input
            type="number"
            placeholder={"price"}
            min={0}
            max={1_000_000}
            onChange={e => newItem.price = +(e.target.value)}
          />

          {/*<select onChange={changeCat} >*/}
          {/*  {categories.map(c =>*/}
          {/*    <option key={c.name}> {c.name} </option>*/}
          {/*  )}*/}
          {/*</select>*/}

          <button type={"submit"}>Add</button>
        </form>
      </div>
      <div>
        {d && JSON.parse(d).length ? JSON.parse(d).map((i: ItemsType) =>
          <div key={i.code}>
            <button onClick={() => dispatch(removeFromLocalStorage(i.code))}>delete</button>
            <ProductCard i={i}/>
          </div>
        ):
          <div>
            No items at localstorage
          </div>
        }
      </div>
    </div>
  );
};

export default Admin;
