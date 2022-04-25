import React from "react";
import Image from "next/image";
import styles from "./Card.module.scss";
import { StandardButton } from "../Button";

interface Props {
  title: string;
  price: number;
  currency?: string;
  street: string;
  image: string;
  index: number;
  primaryClick: () => void;
  primaryText: string;
  secondaryClick: () => void;
  secondaryText: string;
}

export const Card = ({
  title,
  price,
  currency,
  street,
  image,
  index,
  primaryText,
  primaryClick,
  secondaryText,
  secondaryClick,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <Image
          key={index}
          src={image}
          alt={title}
          width={"100%"}
          height={"100%"}
          layout="responsive"
          objectFit="contain"
        />
      </div>
      <div className={styles.right_container}>
        <div className={styles.text_container}>
          <h2>{index + 1}</h2>
          <p>{title}</p>
          <p>{`${price} ${currency || "€"}`}</p>
          <p>{street}</p>
        </div>
        <div className={styles.buttons_container}>
          <StandardButton secondary text={primaryText} onClick={primaryClick} />
          <StandardButton text={secondaryText} onClick={secondaryClick} />
        </div>
      </div>
    </div>
  );
};
