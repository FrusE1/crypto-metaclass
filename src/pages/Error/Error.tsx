import React from "react";

import { Link } from "react-router-dom";

import styles from "./Error.module.scss";

const Error = () => {
  return (
    <div className={styles.error}>
      Page not found.{" "}
      <Link to="/" className={styles.error_link}>
        Go to main page
      </Link>
    </div>
  );
};

export default React.memo(Error);
