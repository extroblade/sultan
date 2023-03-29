import React, {FC, useEffect, useState} from 'react';
import {addToLocalStorage, removeFromLocalStorage, setTypes} from "../store/items/itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import ItemsType from "../types/items-type";
import {selectItemData} from "../store/items/selectors";
import {getItemsFromAdmin} from "../utils/getItemsFromAdmin";
import styles from "./ProductCard/ProductCard.module.css";
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "../utils/consts";
import {ReactComponent as GrIcon} from "../static/gr.svg";
import {ReactComponent as LitIcon} from "../static/lit.svg";
import {Categories} from "../store/items/itemsTypes";

interface IType {
  i: ItemsType
}

const AdminCard: FC<IType> = ({i}) => {
  const { categories } = useSelector(selectItemData)

  const dispatch = useDispatch()
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(i.name)
  const [size, setSize] = useState(i.size)
  const [type, setType] = useState(i.type)
  const [brand, setBrand] = useState(i.brand)
  const [seller, setSeller] = useState(i.seller)
  const [price, setPrice] = useState(i.price)
  const [url, setUrl] = useState(i.url)

  const newItem = [...getItemsFromAdmin()].find(item => item.code === i.code)

  const [cat, setCat] = useState([...categories])
  let newCats: Categories[] = [...cat]

  useEffect(()=>{
    localStorage.setItem("types", JSON.stringify(cat));
  },[cat])

  const changeCat = (event: any) => {
    if(!event.target.checked && newCats){

      newCats = [...[...newCats].filter(item => item.name !== event.target.value), {
        // @ts-ignore
        name: newCats.find((item: Categories) => item.name === event.target.value).name,
        // @ts-ignore
        itemsCodes: [...newCats.find((item: Categories) => item.name === event.target.value).itemsCodes, i.code]
      }]
    }
  }


  const ready = () => {
    newItem.name = name
    newItem.size = size
    newItem.type = type
    newItem.brand = brand
    newItem.seller = seller
    newItem.price = price
    newItem.url = url
    setCat(() => [...newCats])
    setEditing(false)
    dispatch(setTypes())
    dispatch(removeFromLocalStorage(i.code))
    dispatch(addToLocalStorage(newItem))
  }

  return (
    <div>
      <button onClick={() => dispatch(removeFromLocalStorage(i.code))}>delete</button>
      <button onClick={() => setEditing(true)}>edit</button>
      <button onClick={ready}>ready</button>

      {editing ?

        <div className={styles.item} key={i.code}>
          <div className={styles.img__container}>
            <Link to={PRODUCT_ROUTE+'/'+i.code}>
              <img src={i.url} alt="product" className={styles.img}/>
              <input type="text" value={url} onChange={(event) => setUrl(event.target.value)}/>
            </Link>
          </div>

          <div className={styles.text__container}>
            <p className={styles.size}>
              {i.type==="weight" ? <GrIcon/> : <LitIcon/>}
              <span>
                {`  ${i.size}`} {i.type==="weight" ? " г" : " мл"}
                <input type="number" value={size} onChange={(event) => setSize(+event.target.value)}/>
                <input type="text" value={type} onChange={(event) => setType(event.target.value)}/>

              </span>
            </p>
            <div className={styles.info__container}>
              <p>
                Название:
                <span className={styles.item__info}>
                  <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                </span>
              </p>

              <p> Штрихкод:
                <span className={styles.item__info}>
                  {i.code}
                </span>
              </p>

              <p>
                Производитель:
                <span className={styles.item__info}>
                  <input type="text" value={seller} onChange={(event) => setSeller(event.target.value)}/>
                </span>
              </p>

              <p>
                Бренд:
                <span className={styles.item__info}>
                  <input type="text" value={brand} onChange={(event) => setBrand(event.target.value)}/>
                </span>
              </p>


              <div style={{display: "flex", flexDirection: "column"}}>
                <p> Тип ухода: (временно нельзя менять)</p>
                {[...cat].sort((a,b) => a.name.localeCompare(b.name)).map(c =>
                  <div key={c.name}>
                    <input
                      style={{display: "flex"}}
                      type={"checkbox"}
                      value={c.name}
                      checked={c.itemsCodes.find(item => item === i.code) === i.code}
                      onChange={changeCat}
                    /> {c.name}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <strong>
              <input type="number" value={price} onChange={(event) => setPrice(+event.target.value)}/> &#8376;
            </strong>
          </div>
        </div>
        :
        <div className={styles.item} key={i.code}>
          <div className={styles.img__container}>
            <Link to={PRODUCT_ROUTE+'/'+i.code}>
              <img src={i.url} alt="product" className={styles.img}/>
            </Link>
          </div>

          <div className={styles.text__container}>
            <p className={styles.size}>
              {i.type==="weight" ? <GrIcon/> : <LitIcon/>}
              <span>{`  ${i.size}`} {i.type==="weight" ? " г" : " мл"}</span>
            </p>
            <Link to={PRODUCT_ROUTE+'/'+i.code}>
              <p className={styles.name}> <strong>{i.brand.toUpperCase()}</strong> {i.name} </p>
            </Link>
            <div className={styles.info__container}>
              <p> Штрихкод: <span className={styles.item__info}>
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

              <p>
                Тип ухода: <span>
              <select>
                {
                  categories.find((c: any) => {
                    return c.itemsCodes.find((item:any) => item===i.code)===i.code
                  }) ?
                    // @ts-ignore
                    categories.filter((c: any) => {
                      return c.itemsCodes.find((item:any) => item===i.code)===i.code
                    }).map(f =>
                      <option key={f.name}>{f.name}</option>
                    ) :
                    <option>Не указан </option>
                }
              </select>
            </span>
              </p>
            </div>

          </div>
          <div className={styles.bottom}>
            <strong> {Math.ceil(i.price)} &#8376; </strong>
          </div>
        </div>
      }

    </div>

  );
};

export default AdminCard;
