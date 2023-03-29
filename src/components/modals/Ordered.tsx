import React from 'react';
import styles from "./AddToCartModal.module.css";

import {ReactComponent as Completed} from "../../static/completed.svg";

const Ordered = ({show, onHide}: any) => {
  return (
    <div>
      {show &&
        <div className={styles.modal} style={{display: "flex", flexDirection: "column", justifyContent:"flex-start"}}>
          <div style={{display: "flex", justifyContent:"flex-end", marginBottom: "20vh", marginLeft: "50vw"}}>
            <button onClick={onHide} className={styles.btn__text}>
              X
            </button>
          </div>
          <div>
            <div className={styles.btn__text} style={{width: "60px"}}>
              <Completed/>
            </div>
            <h2>Спасибо за заказ</h2>
            <p>Наш менеджер свяжется с вами в ближайшее время</p>
          </div>

        </div>
      }
    </div>
  );
};

export default Ordered;
