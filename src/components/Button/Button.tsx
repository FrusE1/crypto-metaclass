import React from "react";

import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import classNames from "classnames";

import styles from "./Button.module.scss";

/** Пропсы, которые принимает компонент Button */
export type ButtonProps = React.PropsWithChildren<{
  /** Статус загрузки кнопки */
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
        <Loader className={styles.loader} loading size={LoaderSize.s} />
      )}
      {children}
    </button>
  );
};

export default React.memo(Button);
