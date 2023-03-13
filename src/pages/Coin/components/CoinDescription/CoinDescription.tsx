import React from "react";

import styles from "./CoinDescription.module.scss";

/** Пропсы, которые принимает компонент CoinDescription */
export type CoinDescriptionProps = {
  /** Описание криптовалюты */
  description: string;
};

const CoinDescription: React.FC<CoinDescriptionProps> = ({
  description,
}: CoinDescriptionProps) => {
  return (
    <div className={styles.coinDescription}>
      <h2 className={styles.coinDescription__title}>Description</h2>
      <p
        className={styles.coinDescription__subtitle}
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      ></p>
    </div>
  );
};

export default React.memo(CoinDescription);
