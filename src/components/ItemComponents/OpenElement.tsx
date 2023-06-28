import React, {FC, ReactNode, useState} from 'react';
import styles from '../../pages/Item/Item.module.css';
import {ReactComponent as ArrowOpenIcon} from '../../static/small_arrow_open.svg';
import {ReactComponent as ArrowIcon} from '../../static/small_arrow.svg';

interface iElement {
  name: string;
  children?: ReactNode;
}

const OpenElement: FC<iElement> = ({name, children}) => {
  const [active, setActive] = useState(true);
  return (
    <>
      <button
        onClick={() => setActive(() => !active)}
        className={styles.open__button}
      >
        {name} {active ? <ArrowOpenIcon /> : <ArrowIcon />}
      </button>
      {!active && <>{children}</>}
    </>
  );
};

export default OpenElement;
