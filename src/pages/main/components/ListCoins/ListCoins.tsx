import React from "react";

import Card from "@components/Card";
import { CoinsModel } from "@store/models/coins";
import { useNavigate } from "react-router-dom";

import styles from "./ListCoins.module.scss";
import Price from "../Price";

/** Пропсы, которые принимает компонент ListCoins */
export type ListCoinsProps = {
  /** Список криптомонет */
  items: CoinsModel[];
};

const ListCoins: React.FC<ListCoinsProps> = ({ items }: ListCoinsProps) => {
  const navigate = useNavigate();

  const goToPage = (id: string): void => {
    navigate(`/coin/${id}`);
  };

  return (
    <div className={styles.listCoins}>
      {items.map((item) => {
        return (
          <Card
            key={item.id}
            image={item.image}
            title={item.name}
            subtitle={item.symbol}
            content={
              <Price
                price={item.currentPrice}
                percentage={item.priceChangePercentage}
              />
            }
            onClick={() => goToPage(item.id)}
          />
        );
      })}
    </div>
  );
};

export default ListCoins;
