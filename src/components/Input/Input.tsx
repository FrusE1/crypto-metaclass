import React from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";

/** Пропсы, которые принимает компонент Input */
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  ...props
}: InputProps) => {
  return (
    <input
      {...props}
      type="text"
      className={classNames(
        styles.input,
        props.disabled && styles.input_disabled,
        props.className
      )}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
};

export default React.memo(Input);
