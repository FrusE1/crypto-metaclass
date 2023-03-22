import React from "react";

import classNames from "classnames";

import styles from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

<<<<<<< HEAD
export type LoaderProps = {
  loading: boolean;
  size?: LoaderSize;
=======
/** Пропсы, которые принимает компонент Loader */
export type LoaderProps = {
  /** Статус загрузки лоадера */
  loading: boolean;
  /** Размер лоадера */
  size?: LoaderSize;
  /** Дополнительный класс для стилизации */
>>>>>>> 6499884 (hw-5)
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loading,
  size,
  className,
}: LoaderProps) => {
  return (
    <>
      {loading && (
        <div
          className={classNames(
            styles.loader,
            className,
            size ? styles[size] : styles.m
          )}
        ></div>
      )}
    </>
  );
};

export default React.memo(Loader);
