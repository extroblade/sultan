import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";
import {setCategories, setFilters, sort, sortCat} from '../../store/items/itemsSlice';
import {getItemsFromAdmin} from "../../utils/getItemsFromAdmin";
import styles from './Params.module.css'
import {ReactComponent as LensIcon} from "../../static/lens.svg";
import {ReactComponent as TrashIcon} from "../../static/delete.svg";
import {ReactComponent as ArrowUpIcon} from "../../static/arrow_up.svg";
import {ReactComponent as ArrowDownIcon} from "../../static/arrow_down.svg";
import {Link} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";
import {ReactComponent as LeftArrow} from "../../static/leftarrow.svg";

export interface iFilters {
  key: string;
  value: number[] | string;
}

const Params = () => {
  const { brands, sellers, filters, categories, currentCat } = useSelector(selectItemData);

  const maxPrice = [...getItemsFromAdmin()].sort((a,b) => b.price-a.price)[0].price

  const dispatch = useDispatch()
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(maxPrice>=10000 ? maxPrice : 10000)

  const [cat, setCat] = useState("")

  const [filtersList, setFiltersList] = useState<iFilters[]>([])
  const [pressedBrands, setPressedBrands] = useState(false)
  const [sortedBrands, setSortedBrands] = useState([...brands.slice(0, 4)])
  const [pressedSellers, setPressedSellers] = useState(false)
  const [sortedSellers, setSortedSellers] = useState([...sellers.slice(0, 4)])

  const [mobileOpen, setMobileOpen] = useState(false)

  function sortSellersSearch(event: { target: { value: string } }) {
    setSortedSellers(
      [...[...sellers].filter((i:string) => {
        const regex = new RegExp(event.target.value, 'gi')
        return i.match(regex)
      })]
    )
  }

  const changePressedSellers = () => {
    setPressedSellers(() => !pressedSellers)
    pressedSellers ? setSortedSellers([...sellers.slice(0,4)]) : setSortedSellers([...sellers])
  }

  function sortBrandsSearch(event: { target: { value: string } }) {
    setSortedBrands(
      [...[...brands].filter((i:string) => {
        const regex = new RegExp(event.target.value, 'gi')
        return i.match(regex)
      })]
    )
  }

  const changePressedBrands = () => {
    setPressedBrands(() => !pressedBrands)
    pressedBrands ? setSortedBrands([...brands.slice(0,4)]) : setSortedBrands([...brands])
  }

  useEffect(() => {
    if(filtersList.find(item => item.key==="price")){
      setFiltersList([
        {key: "price", value: [minValue, maxValue]},
        ...filtersList.splice(1, filtersList.length)
      ])
    } else {
      setFiltersList([...filtersList, {key: "price", value: [minValue, maxValue]}])
    }
  },[minValue, maxValue])


  useEffect(()=>{
    dispatch(sort())
  },[filters])

  useEffect(()=>{
    dispatch(setCategories(cat))
    dispatch(sortCat())
    window.scrollTo(0, 0)
  },[cat])

  const getFilters = (event:any) => {
    if(event.target.checked){
      setFiltersList(() => [...filtersList, {key: event.target.id, value: event.target.name}])
    } else {
      if(filtersList.length){
        // @ts-ignore
        setFiltersList((f) => f.filter((i) => {
          return i ? (i.key !== event.target.id) && (i.value !== event.target.name) : false
        }))
      }
    }
  }

  const show = () => {
    dispatch(setFilters([...new Set([...filtersList])] ))
    setMobileOpen(() => false)
    window.scrollTo(0, 0)
  }

  const reset = () => {
    const inputs = document.getElementsByTagName('input');
    for (let index = 0; index < inputs.length; ++index) {
      if(inputs[index].type === "text"){
        inputs[index].value = ''
      } else if (inputs[index].type === "checkbox" && inputs[index].checked){
        inputs[index].checked = !inputs[index].checked
      }
    }
    setMinValue(0)
    setMaxValue([...getItemsFromAdmin()].sort((a,b) => b.price-a.price)[0].price)

    dispatch(setFilters([] ))
    setCat(() => "")
    dispatch(setCategories(""))
    setMobileOpen(() => false)
    window.scrollTo(0, 0)
  }

  const open = () => {
    window.scrollTo(0, 0)
    setMobileOpen(() => !mobileOpen)
  }

  if (mobileOpen) return (
    <div className={styles.params}>
      <div className={styles.open_modal}>
        <div className={`${styles.breadcrumbs} ${styles.mobile}`}>
          <Link to={SHOP_ROUTE} className={styles.breadcrumb}>
            <div className={styles.arrow}>
              <LeftArrow/>
            </div>
            <span>
            Назад
          </span>
          </Link>
        </div>
        <h2 className={styles.mobile}>Косметика и гигиена</h2>

        <h4>
          ПОДБОР ПО ПАРАМЕТРАМ
          <button className={styles.mobile} onClick={open}>
            <ArrowUpIcon/>
          </button>
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
            <button type={"submit"} className={``}>
              <LensIcon/>
            </button>
          </div>
          {sortedSellers.map(i =>
              <div key={i} className={styles.sort__item}>
                <input type="checkbox" name={i} id={"seller"} className={styles.checkbox} onChange={getFilters}/>{i}
                <span>
          ({[...getItemsFromAdmin()].filter(it => it.seller === i || "all" === i).reduce((a:number) => a+1,0)})
        </span>
              </div>
          )}
          <button className={styles.link__opener} onClick={() => changePressedSellers()}>
            {pressedSellers ?
              <span>Скрыть &#9650;</span>:
              <span>Показать все &#9660;</span>}
          </button>
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
                <span>
          ({[...getItemsFromAdmin()].filter(it => it.brand === i || "all" === i).reduce((a:number) => a+1,0)})
        </span>
              </div>
          )}
          <button className={styles.link__opener} onClick={() => changePressedBrands()}>
            {pressedBrands ?
              <span>Скрыть &#9650;</span>:
              <span>Показать все &#9660;</span>}
          </button>
        </div>


        <div className={styles.btns}>
          <button className={styles.btn__text} onClick={() => show()}>
            <span>Показать</span>
          </button>
          <button className={`${styles.btn} ${styles.btn__img}`} onClick={() => reset()}>
            <TrashIcon/>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.params}>
      <h4>
        ПОДБОР ПО ПАРАМЕТРАМ
        <button className={styles.mobile} onClick={open}>
          <ArrowDownIcon/>
        </button>
      </h4>
      <span className={styles.pc}>
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
            <button type={"submit"} className={``}>
              <LensIcon/>
            </button>
          </div>
          {sortedSellers.map(i =>
            <div key={i} className={styles.sort__item}>
              <input type="checkbox" name={i} id={"seller"} className={styles.checkbox} onChange={getFilters}/>{i}
              <span>
                ({[...getItemsFromAdmin()].filter(it => it.seller === i || "all" === i).reduce((a:number) => a+1,0)})
              </span>
            </div>
          )}
          <button className={styles.link__opener} onClick={() => changePressedSellers()}>
            {pressedSellers ?
              <span>Скрыть &#9650;</span>:
              <span>Показать все &#9660;</span>}
          </button>
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
              <span>
                ({[...getItemsFromAdmin()].filter(it => it.brand === i || "all" === i).reduce((a:number) => a+1,0)})
              </span>
            </div>
          )}
          <button className={styles.link__opener} onClick={() => changePressedBrands()}>
            {pressedBrands ?
              <span>Скрыть &#9650;</span>:
              <span>Показать все &#9660;</span>}
          </button>
        </div>


        <div className={styles.btns}>
          <button className={styles.btn__text} onClick={() => show()}>
            <span>Показать</span>
          </button>
          <button className={`${styles.btn} ${styles.btn__img}`} onClick={() => reset()}>
            <TrashIcon/>
          </button>
        </div>
      </span>
      <div className={styles.categories}>
        {categories.map((c: any) =>
          <div className={styles.categories__btns} key={c.name}>
            <div className={`${styles.hl} ${styles.pc}`}></div>
            <button onClick={() => setCat(c.name)} className={c.name===currentCat ? styles.type__current : styles.type}>
              {c.name.toUpperCase()}
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Params;
