import React from "react";

import styles from "./Card.module.scss";

/** Пропсы, которые принимает компонент Card */
export type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: string;
  /** Подзаголовок карточки */
  subtitle: string;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}: CardProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardInfo}>
        <img className={styles.cardInfo__image} src={image} alt="logo-card" />
        <div className={styles.cardInfo__text}>
          <div className={styles.cardInfo__title}>{title}</div>
          <div className={styles.cardInfo__subtitle}>{subtitle}</div>
        </div>
      </div>
      {content && <div className={styles.cardInfo__content}>{content}</div>}
    </div>
  );
};

export default React.memo(Card);
