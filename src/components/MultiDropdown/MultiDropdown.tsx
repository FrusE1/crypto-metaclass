import React from "react";

import classNames from "classnames";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

export type valueMultiDropdownType = string | null;

/** Пропсы, которые принимает компонент MultiDropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: valueMultiDropdownType;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: valueMultiDropdownType) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
}: MultiDropdownProps) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const clickVisible = (): void => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  const isChecked = (value: valueMultiDropdownType, key: string): boolean => {
    return value === key;
  };

  const changeValue = (
    value: valueMultiDropdownType,
    key: string
  ): string | null => {
    return isChecked(value, key) ? null : key;
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
        {value || "Chose category"}
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
                  onChange={() => onChange(changeValue(value, item.key))}
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
