import React from "react";

import { formatDate } from "@utils/formatDate";
import formatNumber from "@utils/formatNumber";

import styles from "./CustomTooltip.module.scss";

/** Пропсы, которые принимает компонент CustomTooltip */
export type CustomTooltipProps = {
  active?: boolean;
  payload?: Record<string, any>[];
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.customTooltip__date}>{`Date: ${formatDate(
          payload[0].payload.date
        )}`}</p>
        <p className={styles.customTooltip__label}>{`$${formatNumber(
          payload[0].value
        )}`}</p>
      </div>
    );
  }

  return null;
};

export default React.memo(CustomTooltip);
