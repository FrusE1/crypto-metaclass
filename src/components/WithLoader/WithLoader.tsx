import React from "react";

import Loader from "@components/Loader";

import styles from "./WithLoader.module.scss";

<<<<<<< HEAD
export type WithLoaderProps = React.PropsWithChildren<{
=======
/** Пропсы, которые принимает компонент WithLoaderProps */
export type WithLoaderProps = React.PropsWithChildren<{
  /** Статус загрузки обертки */
>>>>>>> 6499884 (hw-5)
  loading: boolean;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({
  children,
  loading,
}: WithLoaderProps) => {
<<<<<<< HEAD
  return (
    <>
      {loading ? (
        <div className={styles.withLoader}>
          <Loader loading={loading} />
        </div>
      ) : (
        children
      )}
    </>
  );
=======
  if (loading) {
    return (
      <div className={styles.withLoader}>
        <Loader loading />
      </div>
    );
  }
  return <>{children}</>;
>>>>>>> 6499884 (hw-5)
};

export default WithLoader;
