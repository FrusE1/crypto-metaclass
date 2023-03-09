import React from "react";

import styles from "./Input.module.scss";

var classNames = require("classnames");

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange?: (value: string) => void;
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
        { input_disabled: props.disabled },
        props.className || ""
      )}
      value={value}
    />
  );
};

export default Input;
