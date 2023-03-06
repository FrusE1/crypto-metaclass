import React from "react";

// Используя этот конвертер выдает ошибку
// Ошибка "Первый аргумент должен быть строкой"
import parse from "html-react-parser";

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

export default React.memo(CoinDescription);
