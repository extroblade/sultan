import React from 'react';

import styles from "./AddToCartModal.module.css"

const AddToCartModal = ({show, onHide}: any) => {

  return (
    <div>
      {show &&
        <div className={styles.modal}>
          <p>Successfully added to cart</p>
          <button onClick={onHide}>
            Ok
          </button>
        </div>
      }
    </div>
  )
};

export default AddToCartModal;
