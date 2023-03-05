import React from "react";

import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import classNames from "classnames";

import styles from "./Button.module.scss";

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
        loading && styles.button_disabled,
        props.className
      )}
    >
      {loading && (
        <Loader
          className={styles.loader}
          loading={loading}
          size={LoaderSize.s}
        />
      )}
      {children}
    </button>
  );
};

export default React.memo(Button);
