import React from "react";

import styles from "./Button.module.scss";

// import { Loader, LoaderSize } from '../Loader/Loader';
var classNames = require("classnames");

export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={loading}
      {...props}
      className={classNames(
        styles.button,
        { button_disabled: props.disabled || loading },
        props.className || ""
      )}
    >
      {/* {loading && <Loader loading size={LoaderSize.s} />} */}
      {children}
    </button>
  );
};

export default Button;
