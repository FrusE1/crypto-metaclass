import React from "react";

import Loader from "@components/Loader";

import styles from "./WithLoader.module.scss";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({
  children,
  loading,
}: WithLoaderProps) => {
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
};

export default WithLoader;
