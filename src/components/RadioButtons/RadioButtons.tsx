import React from "react";

import classNames from "classnames";

import styles from "./RadioButtons.module.scss";

/** Пропсы, которые принимает компонент RadioButtons */
export type RadioButtonsProps = {
  /** Все значения */
  items: Record<any, any>[];
  /** Текущее выбранное значение */
  currentValue: string;
  /** Имя для группирования значений фильтрации */
  name: string;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: string) => void;
  /** Доболнительный класс родительскому элементу */
  className?: string;
};

const RadioButtons: React.FC<RadioButtonsProps> = ({
  items,
  currentValue,
  name,
  onChange,
  className,
}: RadioButtonsProps) => {
  return (
    <div className={classNames(styles.radioButtons, className)}>
      {items.map((item) => {
        return (
          <label className={styles.radioButtons__label} key={item.value}>
            <input
              className={styles.radioButtons__radio}
              type="radio"
              value={item.value}
              name={name}
              checked={item.value == currentValue}
              onChange={(e) => onChange(e.target.value)}
            />
            <span className={styles.radioButtons__span}>{item.name}</span>
          </label>
        );
      })}
    </div>
  );
};

export default React.memo(RadioButtons);
