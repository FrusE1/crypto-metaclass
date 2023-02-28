import React from "react";

import Card from "@components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./ListCoins.module.scss";
import Price from "../Price";

export type ListCoinEntity = {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: string;
  price_change_percentage_24h: string;
};

const ListCoins = () => {
  const [coins, setCoins] = React.useState<Array<ListCoinEntity>>([]);
  const navigate = useNavigate();

  async function getCoins() {
    let coins = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
    );
    setCoins(coins.data);
  }

  const goToPage = (id: string): void => {
    navigate(`/coins/${id}`);
  };

  React.useEffect(() => {
    getCoins();
  }, []);

  return (
    <div className={styles.listCoins}>
      {coins.map((item) => {
        return (
          <React.Fragment key={item.id}>
            <Card
              image={item.image}
              title={item.name}
              subtitle={item.symbol}
              content={
                <Price
                  price={item.current_price}
                  percentage={item.price_change_percentage_24h}
                />
              }
              onClick={() => goToPage(item.id)}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ListCoins;
