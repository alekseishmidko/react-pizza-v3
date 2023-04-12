import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.block}>
      <h1 className={styles.root}>Ничего не найдено</h1>
      <p className={styles.text}>К сожалению страница отсутствует</p>
    </div>
  );
};

export default NotFoundBlock;
