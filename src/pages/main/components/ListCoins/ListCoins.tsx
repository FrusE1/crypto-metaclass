import React from "react";

import Card from "@components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./ListCoins.module.scss";
import Price from "../Price";
import { ResponseApi } from "../Select/Select";

const ListCoins = () => {
  const [coins, setCoins] = React.useState<Array<Record<string, string>>>([]);
  const navigate = useNavigate();

  async function getCoins() {
    let coins: ResponseApi = await axios.get(
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
