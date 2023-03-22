import React from "react";

import { Link } from "react-router-dom";

import styles from "./ErrorMessage.module.scss";

const ErrorMessage = () => {
  return (
    <div className={styles.errorMessage}>
      Data not found.{" "}
      <Link to="/" className={styles.errorMessage_link}>
        Go to main page
      </Link>
    </div>
  );
};

export default React.memo(ErrorMessage);
