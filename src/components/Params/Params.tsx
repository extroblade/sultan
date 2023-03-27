import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";
import {setCategories, setFilters, sort, sortCat} from '../../store/items/itemsSlice';
import {getItemsFromAdmin} from "../../utils/getItemsFromAdmin";
import {Filters} from "../../store/items/itemsTypes";
import styles from './Params.module.css'
import {ReactComponent as LensIcon} from "../../static/lens.svg";
import {ReactComponent as TrashIcon} from "../../static/delete.svg";

const Params = () => {
  const { brands, sellers, filters, categories} = useSelector(selectItemData);

  const dispatch = useDispatch()
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState([...getItemsFromAdmin()].sort((a,b) => b.price-a.price)[0].price)

  const [sortedBrands, setSortedBrands] = useState([...brands])
  const [cat, setCat] = useState("")
  const [sortedSellers, setSortedSellers] = useState([...sellers])
  const [filtersList, setFiltersList] = useState([])

  useEffect(() => { //fix ts
    // @ts-ignore
    if(filtersList.find(item => item.key==="price")){
      // @ts-ignore
      setFiltersList([{key: "price", value: [minValue, maxValue]}, ...filtersList.splice(1, filtersList.length)])
    } else {
      // @ts-ignore
      setFiltersList([...filtersList, {key: "price", value: [minValue, maxValue]}])
    }
  },[minValue, maxValue])


  function sortBrandsSearch(event: { target: { value: string } }) {
    setSortedBrands(
      [...[...brands].filter((i:string) => {
        const regex = new RegExp(event.target.value, 'gi')
        return i.match(regex)
      })]
    )
  }

  function sortSellersSearch(event: { target: { value: string } }) {
    setSortedSellers(
      [...[...sellers].filter((i:string) => {
        const regex = new RegExp(event.target.value, 'gi')
        return i.match(regex)
      })]
    )
  }

  useEffect(()=>{
    dispatch(sort())
  },[filters])

  useEffect(()=>{
    console.log(cat)
    dispatch(setCategories(cat))
    dispatch(sortCat())

  },[cat])

  const getFilters = (event:any) => {
    if(event.target.checked){
      // @ts-ignore
      setFiltersList(() => [...filtersList, {key: event.target.id, value: event.target.name}])
    } else {
      if(filtersList.length){
        setFiltersList((f) => f.filter((i:Filters) => {
          return i ? (i.key !== event.target.id) && (i.value !== event.target.name) : false
        }))
      }
    }
  }

  const show = () => {
    dispatch(setFilters([...new Set([...filtersList])] ))
  }

  const reset = () => {

    const inputs = document.getElementsByTagName('input');
    for (let index = 0; index < inputs.length; ++index) {
      if(inputs[index].type =="text"){
        inputs[index].value = ''
      } else if (inputs[index].type == "checkbox" && inputs[index].checked){
        inputs[index].checked = !inputs[index].checked
      }
    }

    dispatch(setFilters([] ))
    setCat(() =>"")
    dispatch(setCategories(""))
  }

  return (
    <div className={styles.params}>
      <h4>
        ПОДБОР ПО ПАРАМЕТРАМ
      </h4>
      <p className={styles.params__small}>
        Цена <strong> &#8376; </strong>
      </p>
      <div className={styles.price}>
        <input
          type="number"
          value={Math.abs(minValue)}
          className={styles.price__input}
          onChange={(event: any) => setMinValue(event.target.value)}
          min={0}
          max={maxValue}
        />
        <span className={`${styles.price} ${styles.line}`}>-</span>
        <input
          type="number"
          value={Math.abs(maxValue)}
          className={styles.price__input}
          onChange={(event) => setMaxValue(event.target.value)}
          min={minValue}
          max={1000000}
          />
      </div>

      <div className={styles.sort}>
        <h4>Производитель</h4>
        <div className={`${styles.input}`}>
          <input type="text" placeholder={"Поиск..."} onChange={sortSellersSearch}/>
          <button type={"submit"} className={`${styles.btn} ${styles.btn__img}`}>
            <LensIcon/>
          </button>
        </div>
        {sortedSellers.map(i =>
          <div key={i} className={styles.sort__item}>
            <input type="checkbox" name={i} id={"seller"} className={styles.checkbox} onChange={getFilters}/>{i}
            <span> ({[...getItemsFromAdmin()].filter(it => it.seller === i || "all" === i).reduce((a:number) => a+1,0)})</span>
          </div>
        )}
      </div>

      <div className={styles.sort}>
        <h4>Бренд</h4>
        <div className={`${styles.input}`}>
          <input type="text" placeholder={"Поиск..."} onChange={sortBrandsSearch}/>
          <button type={"submit"} className={``}>
            <LensIcon/>
          </button>
        </div>
        {sortedBrands.map(i =>
          <div key={i} className={styles.sort__item}>
            <input type="checkbox" name={i} id={"brand"} className={styles.checkbox} onChange={getFilters}/>{i}
            <span> ({[...getItemsFromAdmin()].filter(it => it.brand === i || "all" === i).reduce((a:number) => a+1,0)})</span>
          </div>
        )}
      </div>

      <div className={styles.btns}>
        <button className={styles.btn__text} onClick={() => show()}>
          <span>Показать</span>
        </button>
        <button className={`${styles.btn} ${styles.btn__img}`} onClick={() => reset()}>
          <TrashIcon/>
        </button>
      </div>

      <div className={styles.categories} style={{marginTop: "20px"}}>
        {categories.map((c: any) =>
          <div className={styles.categories__btns} key={c.name}>
            <div className={styles.hl}></div>
            <button onClick={() => setCat(c.name)}>
              {c.name.toUpperCase()}
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Params;
