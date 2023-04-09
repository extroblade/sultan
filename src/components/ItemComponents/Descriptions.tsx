import React, {FC} from 'react';
import styles from "../../pages/Item/Item.module.css";
import OpenElement from "./OpenElement";
import {ItemsType} from "../../store/items/itemsTypes";

interface iDesc {
  i: ItemsType
}
const Descriptions: FC<iDesc> = ({i}) => {
  return (
    <OpenElement name={"Описание"}>
      <p className={styles.desc}>
        {i.desc}
      </p>
    </OpenElement>
  );
};

export default Descriptions;
