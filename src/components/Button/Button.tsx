import React from "react";

import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import classNames from "classnames";

import styles from "./Button.module.scss";

<<<<<<< HEAD
<<<<<<< HEAD
export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
=======
/** Пропсы, которые принимает компонент WithLoaderProps */
=======
/** Пропсы, которые принимает компонент Button */
>>>>>>> 4eb6af3 (Добавлен график цены криптовалюты, а также исправлены некоторые моменты)
export type ButtonProps = React.PropsWithChildren<{
  /** Статус загрузки кнопки */
>>>>>>> 6499884 (hw-5)
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
<<<<<<< HEAD
        <Loader
          className={styles.loader}
          loading={loading}
          size={LoaderSize.s}
        />
=======
        <Loader className={styles.loader} loading size={LoaderSize.s} />
>>>>>>> 6499884 (hw-5)
      )}
      {children}
    </button>
  );
};

export default React.memo(Button);
