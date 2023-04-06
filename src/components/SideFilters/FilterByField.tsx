import React, {FC, ReactNode, useEffect, useState} from 'react';
import styles from "./SideFilters.module.css";
import {ReactComponent as LensIcon} from "../../static/lens.svg";
import {getItemsFromAdmin} from "../../utils/functions";
import {ReactComponent as ArrowIcon} from "../../static/small_arrow.svg";
import {ReactComponent as ArrowOpenIcon} from "../../static/small_arrow_open.svg";
import {useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";

interface iSort {
  field: string;
  getFilters: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode
}

const FilterByField: FC<iSort> = ({field, getFilters, children}) => {

  const sortSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSorted(
      [...[...arr].filter((i:string) => {
        const regex: RegExp = new RegExp(event.target.value, 'gi')
        return i.match(regex)
      })]
    )
  }

  // @ts-ignore
  let arr = [...useSelector(selectItemData)[field+"s"]]  //todo : fix

  const [pressed, setPressed] = useState(false)
  const [sorted, setSorted] = useState([...arr.slice(0, 4)])

  useEffect(() => {
    setSorted( () => [...arr.slice(0, 4)])
  }, [])

  const changePressed = () => {
    setPressed(() => !pressed)
    pressed ? setSorted([...arr.slice(0,4)]) : setSorted([...arr])
  }

  return (
    <div className={styles.sort}>
      <h4>{children}</h4>

      <div className={styles.input}>
        <input
          type="text"
          placeholder={"Поиск..."}
          onChange={sortSearch}
          pattern={"^[0-9]+([0-9]+)?$"}
        />
        <button type={"submit"} className={``}>
          <LensIcon/>
        </button>
      </div>

      {sorted.map((i: string) =>
        <div key={i} className={styles.sort__item}>
          <input
            type="checkbox"
            name={i}
            id={field}
            className={styles.checkbox}
            onChange={getFilters}
            data-testid={i}
          />{i}
          <span>
            ({[...getItemsFromAdmin()].filter(it => it[field] === i || "all" === i).reduce((a:number) => a+1, 0)})
          </span>
        </div>
      )}
      <button className={styles.link__opener} onClick={changePressed}>
        {pressed ?
          <span>Скрыть <ArrowIcon/> </span>:
          <span>Показать все <ArrowOpenIcon/></span>}
      </button>
    </div>
  );
};

export default FilterByField;
