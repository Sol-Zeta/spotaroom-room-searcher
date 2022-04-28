import React from "react";
import { Oval } from "react-loader-spinner";
import styles from "./AppLoader.module.scss";

export const AppLoader = () => {
  return (
    <div className={styles.background}>
      <Oval color="#ffd10d" secondaryColor="#131213" height={120} width={120} />
    </div>
  );
};
