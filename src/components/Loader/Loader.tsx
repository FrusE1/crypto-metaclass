import React from "react";

import classNames from "classnames";

import styles from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading: boolean;
  size?: LoaderSize;
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

export default Loader;
