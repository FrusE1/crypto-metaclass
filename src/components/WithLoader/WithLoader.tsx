import React from "react";

import Loader from "@components/Loader";

import styles from "./WithLoader.module.scss";

/** Пропсы, которые принимает компонент WithLoaderProps */
export type WithLoaderProps = React.PropsWithChildren<{
  /** Статус загрузки обертки */
  loading: boolean;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({
  children,
  loading,
}: WithLoaderProps) => {
  if (loading) {
    return (
      <div className={styles.withLoader}>
        <Loader loading />
      </div>
    );
  }
  return <>{children}</>;
};

export default WithLoader;
