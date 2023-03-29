import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {addToLocalStorage, setTypes} from '../store/items/itemsSlice';
import ItemsType from "../types/items-type";
import { selectItemData } from "../store/items/selectors";
import {Categories} from "../store/items/itemsTypes";
import AdminCard from "../components/AdminCard";

const Admin = () => {
  const dispatch = useDispatch()
  const { items, categories } = useSelector(selectItemData)
  const [cat, setCat] = useState([...categories])
  const [id, setId] = useState(Date.now())

  const newItem: ItemsType = {brand: "", code: String(id), desc: "", name: "", price: 0, seller: "", size: 0, type: "", url: ""}
  const [d, setD] = useState(localStorage.getItem('items'))

  useEffect(() => {
    document.title = `Админка`;
  },[])

  useEffect(()=>{
    setD(() => localStorage.getItem('items'))
  },[items, newItem])

  useEffect(()=>{
    localStorage.setItem("types", JSON.stringify(cat));
  },[cat])

  let newCats: Categories[] = [...cat]

  const changeCat = (event: any) => {
    console.log(event)
    if(event.target.checked && newCats){
      newCats = [...[...newCats].filter(item => item.name !== event.target.value), {
        // @ts-ignore
        name: newCats.find((item: Categories) => item.name === event.target.value).name,
        // @ts-ignore
        itemsCodes: [...newCats.find((item: Categories) => item.name === event.target.value).itemsCodes, String(id)]
      }]
    }
  }


  const submit = () => {
    setCat(() => [...newCats])
    dispatch(addToLocalStorage(newItem))
    dispatch(setTypes())
    setId(() => Date.now())
  }


  const clear = () => {
    localStorage.removeItem("items")
    localStorage.removeItem("types")
  }

  return (
    <div style={{minHeight: "50vh"}}>
      <div className="add">
        <button onClick={clear}>clear</button>
        <form>
          <div>
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
          </div>

          <div style={{display: "flex", flexDirection: "column"}}>
            {[...cat].sort((a,b) => a.name.localeCompare(b.name)).map(c =>
              <div key={c.name}>
                <input
                  style={{display: "flex"}}
                  type={"checkbox"}
                  value={c.name}
                  onChange={changeCat}
                /> {c.name}
              </div>
            )}
          </div>


          <button onClick={submit}>Add</button>
        </form>
      </div>
      <div>
        {d && JSON.parse(d).length ? JSON.parse(d).map((i: ItemsType) =>
          <div key={i.code}>
            <AdminCard i={i}></AdminCard>
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
