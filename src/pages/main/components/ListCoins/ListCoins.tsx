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
<<<<<<< HEAD
    navigate(`/coins/${id}`);
=======
    navigate(`/${id}`);
>>>>>>> 6499884 (hw-5)
  };

  return (
    <div className={styles.listCoins}>
      {items.map((item) => {
        return (
<<<<<<< HEAD
          <React.Fragment key={item.id}>
            <Card
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
          </React.Fragment>
=======
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
>>>>>>> 6499884 (hw-5)
        );
      })}
    </div>
  );
};

export default ListCoins;
