import React from "react";

import styles from "./MultiDropdown.module.scss";

var classNames = require("classnames");

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}: MultiDropdownProps) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const clickVisible = (): void => {
    setIsVisible(isVisible ? false : true);
  };

  const isChecked = (value: Option[], key: string): boolean => {
    return !!value.find((item) => item.key === key);
  };

  const changeValue = (value: Option[], item: Option): Option[] => {
    return value.find((i) => i.key === item.key)
      ? value.filter((i) => i.key !== item.key)
      : [...value, { key: item.key, value: item.value }];
  };

  return (
    <div className={styles.multiDropdown}>
      <button
        onClick={clickVisible}
        className={classNames(styles.multiDropdown__button, {
          dropdown_disabled: disabled,
        })}
        disabled={disabled}
      >
        {pluralizeOptions(value) || "Chose category"}
      </button>
      {isVisible && !disabled && (
        <div className={styles.multiDropdown__list}>
          {options.map((item) => {
            return (
              <label
                className={styles.multiDropdown__list_label}
                key={item.key}
              >
                <input
                  type="checkbox"
                  className={styles.multiDropdown__list_input}
                  value={item.key}
                  onChange={() => onChange(changeValue(value, item))}
                  checked={isChecked(value, item.key)}
                />
                <div className={styles.multiDropdown__list_item}>
                  {item.value}
                </div>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
