import React from "react";

import RadioButtons from "@components/RadioButtons";
import { CoinChartModel } from "@store/models/coinChart";
import { formatTime } from "@utils/formatDate";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import styles from "./CoinChart.module.scss";
import CustomTooltip from "../CustomTooltip";

/** Пропсы, которые принимает компонент CoinChart */
export type CoinChartProps = {
  /** Цена криптовалюты в течение времени */
  prices: CoinChartModel;
  /** Значение диапазона времени цены криптовалюты */
  days: string;
  /** Установить значение диапазона времени */
  setCurrentDays: (days: string) => void;
};

const DAYS: Record<string, string | number>[] = [
  { name: "1 H", value: "0.5" },
  { name: "24 H", value: "12" },
  { name: "1 W", value: "84" },
  { name: "1 M", value: "360" },
  { name: "6 M", value: "2160" },
  { name: "1 Y", value: "4320" },
  { name: "All", value: "max" },
];

const CoinChart: React.FC<CoinChartProps> = ({
  prices,
  days,
  setCurrentDays,
}: CoinChartProps) => {
  // Для того чтобы график не выходил за пределы блока
  // устанавливаем максимальное значение верхней границы
  let maxPriceCoin: number = 0;

  const data: Record<string, any>[] = React.useMemo(() => {
    const result: Record<string, any>[] = [];

    let divisor: number = Math.ceil(prices.length / 50);

    for (let i = 0; i < prices.length; i++) {
      if (i % divisor === 0 || i === 0) {
        result.push({
          ...prices[i],
          value: prices[i].value.toFixed(2),
          time: formatTime(prices[i].date),
        });
        if (prices[i].value > maxPriceCoin) {
          maxPriceCoin = prices[i].value;
        }
      }
    }
    return result;
  }, [prices]);

  const setDay = React.useCallback((value: string) => {
    setCurrentDays(value);
  }, []);

  return (
    <div className={styles.coinChart}>
      <h2 className={styles.coinChart__title}>Diagram</h2>
      <ResponsiveContainer width="100%" height={345}>
        <AreaChart data={data}>
          <Area
            type="linear"
            dataKey="value"
            stroke="#0063F5"
            fill="url(#colorUv)"
            strokeWidth={2}
          />
          <XAxis
            dataKey="time"
            minTickGap={15}
            interval={10}
            padding={{ left: 24, right: 24 }}
            tickSize={8}
          />
          <YAxis hide={true} type="number" domain={["auto", maxPriceCoin]} />
          <Tooltip content={<CustomTooltip />} />
        </AreaChart>
      </ResponsiveContainer>
      <RadioButtons
        className={styles.coinChart__radio_buttons}
        items={DAYS}
        currentValue={days}
        name="days"
        onChange={setDay}
      />
    </div>
  );
};

export default React.memo(CoinChart);
