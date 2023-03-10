import React from "react";

import styles from "./Filter.module.scss";

/** Пропсы, которые принимает компонент Filter */
export type FilterProps = {
  /** Все значения */
  values: Array<string>;
  /** Текущее выбранное значение */
  currentValue: string;
  /** Имя для граппирования значений фильтрации */
  name: string;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: string) => void;
};

const Filter: React.FC<FilterProps> = ({
  values,
  currentValue,
  name,
  onChange,
}: FilterProps) => {
  return (
    <div className={styles.filter}>
      {values.map((value) => {
        return (
          <React.Fragment key={value}>
            <label className={styles.filter__label}>
              <input
                className={styles.filter__radio}
                type="radio"
                value={value}
                name={name}
                checked={value === currentValue}
                onChange={(e) => onChange(e.target.value)}
              />
              <span className={styles.filter__span}>{value}</span>
            </label>
          </React.Fragment>
        );
      })}
      <div className={styles.filter__border}></div>
    </div>
  );
};

export default Filter;
