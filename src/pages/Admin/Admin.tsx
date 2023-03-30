import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {addToLocalStorage, setTypes} from '../../store/items/itemsSlice';
import ItemsType from "../../types/items-type";
import { selectItemData } from "../../store/items/selectors";
import {Categories} from "../../store/items/itemsTypes";
import AdminCard from "../../components/AdminCard";

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

  const changeCat = (event: any) => {
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
    setId(() => Date.now())
  }

  return (
    <div style={{minHeight: "50vh", padding: "0 15vw"}}>
      <button onClick={() => setForm(!form)}>{!form ? "Open" : "Close"}</button>
      {form &&
        <div className="add">
          <form>
            <div>
              <input
                type="text"
                placeholder={"URL изображения"}
                onChange={e => newItem.url = (e.target.value)}
              />
              <input
                type="text"
                placeholder={"Название товара"}
                onChange={e => newItem.name = (e.target.value)}
              />
              <input
                type="text"
                placeholder={"weight | any"}
                onChange={e => newItem.type = (e.target.value)}
              />
              <input
                type="number"
                placeholder={"Размер товара"}
                onChange={e => newItem.size = +(e.target.value)}
              />
              <input
                type="text"
                placeholder={"Производитель"}
                onChange={e => newItem.seller = (e.target.value)}
              />
              <input
                type="text"
                placeholder={"Бренд"}
                onChange={e => newItem.brand = (e.target.value)}
              />
              <input
                type="text"
                placeholder={"Описание товара"}
                onChange={e => newItem.desc = (e.target.value)}
              />
              <input
                type="number"
                placeholder={"Цена"}
                min={0}
                max={1_000_000}
                onChange={e => newItem.price = +(e.target.value)}
              />
            </div>

            <div style={{display: "flex", flexDirection: "column"}}>
              {[...cat].sort((a,b) => a.name.localeCompare(b.name)).map(c =>
                  <span key={c.name} style={{display: "flex", flexDirection: "row"}}>
                <input
                  type={"checkbox"}
                  value={c.name}
                  onChange={changeCat}
                /> {c.name}
              </span>
              )}
            </div>

            <button type={"button"} onClick={submit}>Add</button>
          </form>
        </div>
      }

      <div>
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
