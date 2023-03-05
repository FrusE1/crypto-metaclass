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
      <h2>Description</h2>
      <p>{description}</p>
    </div>
  );
};

export default CoinDescription;
