import React from "react";

import formatNumber from "@utils/formatNumber";
import classNames from "classnames";

import styles from "./Price.module.scss";

export type PriceProps = {
  /** Текущая цена */
  price: string;
  /** Процентр изменения цены */
  percentage: string;
};

const Price: React.FC<PriceProps> = ({ price, percentage }: PriceProps) => {
  return (
    <div className={styles.price}>
      <div className={styles.price_top}>${formatNumber(Number(price))}</div>
      <div
        className={classNames(
          styles.price_bottom,
          Number(percentage) > 0 ? styles.price_green : styles.price_red
        )}
      >
        {Number(percentage) > 0 && "+"}
        {formatNumber(Number(percentage))}%
      </div>
    </div>
  );
};

export default React.memo(Price);
