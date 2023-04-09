import React, {FC} from 'react';
import {Categories, ItemsType} from "../store/items/itemsTypes";
import {useSelector} from "react-redux";
import {selectItemData} from "../store/items/selectors";

interface iType {
  i: ItemsType
}

const TypeSelect: FC<iType> = ({i}) => {
  const { categories } = useSelector(selectItemData);

  return (
    <p>
      Тип ухода: <span>
        <select>
          {
            categories.find((c: Categories) => {
              return c.itemsCodes.find((item) => item===i.code)
            }) ?
              categories.filter((c: Categories) => {
                return c.itemsCodes.find((item) => item===i.code)
              }).map(f =>
                <option key={f.name}> {f.name} </option>
              ) :
              <option> Не указан </option>
          }
        </select>
      </span>
    </p>
  );
};

export default TypeSelect;
