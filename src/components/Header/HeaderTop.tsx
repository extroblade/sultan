import React from 'react';
import styles from "./Header.module.css";
import {ReactComponent as AddressIcon} from "../../static/address.svg";
import {ReactComponent as EmailIcon} from "../../static/email.svg";
import {Link} from "react-router-dom";
import {ADMIN_ROUTE} from "../../utils/consts";

const HeaderTop = () => {
  return (
    <div className={styles.head}>
      <div className={styles.contact}>
        <div className={styles.contact__container}>
          <AddressIcon/>
          <p>
            <strong>г.Кокчетав, ул.Ж. Ташенова 129Б</strong><br/>
            (Рынок Восточный)
          </p>
        </div>

        <div className={styles.vl}/>
        <div className={styles.contact__container}>
          <EmailIcon/>
          <p>
            <strong>opt.sultan@mail.ru</strong><br/>
            На связи в любое время
          </p>
        </div>
      </div>

      <ul className={styles.navigation}>
        <li className={`${styles.navigation__item} ${styles.admin}`}>
          <Link to={ADMIN_ROUTE}>Админка</Link>
        </li>

        <li className={styles.navigation__item}>
          <Link to={"#"}>О компании</Link>
        </li>

        <div className={styles.vl}/>

        <li className={styles.navigation__item}>
          <Link to={"#"}>Доставка и оплата</Link>
        </li>

        <div className={styles.vl}/>
        <li className={styles.navigation__item}>
          <Link to={"#"}>Возврат</Link>
        </li>

        <div className={styles.vl}/>
        <li className={styles.navigation__item}>
          <Link to={"#"}>Контакты</Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderTop;
