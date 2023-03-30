import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {addToLocalStorage, setTypes} from '../../store/items/itemsSlice';
import ItemsType from "../../types/items-type";
import { selectItemData } from "../../store/items/selectors";
import {Categories} from "../../store/items/itemsTypes";
import AdminCard from "../../components/AdminCard";

import styles from "./Admin.module.css"

const Admin = () => {
  const dispatch = useDispatch()
  const { items, categories } = useSelector(selectItemData)
  const [cat, setCat] = useState<Categories[]>([...categories])
  const [id, setId] = useState(Date.now())
  const [form, setForm] = useState(false)

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
    dispatch(setTypes())
  },[cat])

  let newCats: Categories[] = [...cat]

  const changeCat = (event: React.ChangeEvent<HTMLInputElement>) => {
    const findItemNew = newCats.find((item: Categories) => item.name === event.target.value)
    if(event.target.checked && newCats){
      newCats = [...[...newCats].filter(item => item.name !== event.target.value), {
        name: findItemNew ? findItemNew.name : "",
        itemsCodes: findItemNew ? [...findItemNew.itemsCodes, String(id)] : [String(id)]
      }]
    } else if (!event.target.checked){
      const findItem = cat.find((item: Categories) => item.name === event.target.value)
      newCats = [...[...newCats]?.filter(item => item.name !== event.target.value), {
        name: findItem ? findItem.name : "",
        itemsCodes: findItemNew ? [...findItemNew.itemsCodes] : []
      }]
    }
  }

  const submit = () => {
    setCat(() => [...newCats])
    dispatch(addToLocalStorage(newItem))
    localStorage.setItem("types", JSON.stringify(cat));
    dispatch(setTypes())

    const inputs = document.getElementsByTagName('input');
    for (let index = 0; index < inputs.length; ++index) {
      if(inputs[index].type === "text" || inputs[index].type === "number"){
        inputs[index].value = ''
      } else if (inputs[index].type === "checkbox" && inputs[index].checked){
        inputs[index].checked = !inputs[index].checked
      }
    }
    setForm(() => false)
    setId(() => Date.now())
  }

  return (
    <div className={styles.admin}>
      <button className={`${styles.btn__open} ${(form ? styles.open : styles.close)}`} onClick={() => setForm(!form)}>
        {!form ? "Open Form" : "Close Form"}
      </button>
      {form &&
        <div>
          <form>
            <div className={styles.add}>
              <input
                required
                type="text"
                placeholder={"URL изображения"}
                onChange={e => newItem.url = (e.target.value)}
              />
              <input
                required
                type="text"
                placeholder={"Название товара"}
                onChange={e => newItem.name = (e.target.value)}
              />
              <input
                required
                type="text"
                placeholder={"weight | any"}
                onChange={e => newItem.type = (e.target.value)}
              />
              <input
                required
                type="number"
                placeholder={"Размер товара"}
                onChange={e => newItem.size = +(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder={"Производитель"}
                onChange={e => newItem.seller = (e.target.value)}
              />
              <input
                required
                type="text"
                placeholder={"Бренд"}
                onChange={e => newItem.brand = (e.target.value)}
              />
              <input
                required
                type="text"
                placeholder={"Описание товара"}
                onChange={e => newItem.desc = (e.target.value)}
              />
              <input
                required
                type="number"
                placeholder={"Цена"}
                min={0}
                max={1_000_000}
                onChange={e => newItem.price = +(e.target.value)}
              />
            </div>

            <div className={styles.checks}>
              {[...cat].sort((a,b) => a.name.localeCompare(b.name)).map(c =>
                <span key={c.name} className={styles.inner}>
                  <input
                    type={"checkbox"}
                    value={c.name}
                    onChange={changeCat}
                  /> {c.name}
                </span>
              )}
            </div>

            <button type={"button"} className={`${styles.btn__open} ${styles.close}`} onClick={submit}>
              Add
            </button>
          </form>
        </div>
      }

      <div className={styles.admin__grid}>
        {d && JSON.parse(d).length ?[...JSON.parse(d)].sort((a,b) => a.code-b.code).map((i: ItemsType) =>
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
