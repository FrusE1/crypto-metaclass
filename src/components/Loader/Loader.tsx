import React from "react";

import classNames from "classnames";

import styles from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

/** Пропсы, которые принимает компонент Loader */
export type LoaderProps = {
  /** Статус загрузки лоадера */
  loading: boolean;
  /** Размер лоадера */
  size?: LoaderSize;
  /** Дополнительный класс для стилизации */
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
