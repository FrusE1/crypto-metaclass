import React from "react";

<<<<<<< HEAD
// Используя этот конвертер выдает ошибку
// Ошибка "Первый аргумент должен быть строкой"
import parse from "html-react-parser";

=======
>>>>>>> 6499884 (hw-5)
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
<<<<<<< HEAD
      <h2>Description</h2>
      <p>{description}</p>
=======
      <h2 className={styles.coinDescription__title}>Description</h2>
      <p className={styles.coinDescription__subtitle}>{description}</p>
>>>>>>> 6499884 (hw-5)
    </div>
  );
};

export default React.memo(CoinDescription);
