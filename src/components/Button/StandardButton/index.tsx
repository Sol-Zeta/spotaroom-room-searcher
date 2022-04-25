import React from "react";
import styles from "./StandardButton.module.scss";

interface Props {
  text: string;
  secondary?: boolean;
  onClick: () => void;
}

export const StandardButton = ({ text, onClick, secondary }: Props) => {
  return (
    <button
      className={`${styles.container} ${
        secondary && styles.secondary_container
      }`}
      onClick={onClick}
    >
      <p className={`${styles.text} ${secondary && styles.secondary_text}`}>
        {text}
      </p>
    </button>
  );
};
