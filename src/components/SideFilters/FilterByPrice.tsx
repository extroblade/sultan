import React, {FC} from 'react';
import styles from "./SideFilters.module.css";

interface iPrice {
  minValue: number
  maxValue:number
  setMinValue: (event: number) => void
  setMaxValue: (event: number) => void
}

const FilterByPrice: FC<iPrice> = ({minValue, maxValue, setMinValue, setMaxValue}) => {

  return (
    <div>
      <p className={styles.params__small}>
        Цена <strong> &#8376; </strong>
      </p>
      <div className={styles.price}>
        <input
          type="number"
          value={Math.abs(minValue)}
          className={styles.price__input}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMinValue(+event.target.value)}
          min={0}
          max={maxValue}
          data-testid={"min"}
        />
        <span className={`${styles.price} ${styles.line}`}>-</span>
        <input
          type="number"
          value={Math.abs(maxValue)}
          className={styles.price__input}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMaxValue(+event.target.value)}
          min={minValue}
          max={1000000}
          data-testid={"max"}
        />
      </div>
    </div>
  );
};

export default FilterByPrice;
