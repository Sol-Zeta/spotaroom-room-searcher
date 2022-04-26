import React from "react";
import Image from "next/image";
import styles from "./Card.module.scss";
import { StandardButton } from "../Button";
import { Icon } from "../Icon";
import { icons } from "../../assetsRoutes";

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
          objectFit="cover"
        />
      </div>
      <div className={styles.right_container}>
        <div className={styles.text_container}>
          {/* <h2>{index + 1}</h2> */}
          <p className={styles.title}>{title}</p>
          <div className={styles.price_container}>
            <p>{`${price} ${currency || "€"}`}</p>
          </div>
          <div className={styles.street_container}>
            <Icon icon={icons['location']}/>
            <p>{street}</p>
          </div>
        </div>
        <div className={styles.buttons_container}>
          <StandardButton customStyles={styles.first_button} secondary text={primaryText} onClick={primaryClick} />
          <StandardButton text={secondaryText} onClick={secondaryClick} />
        </div>
      </div>
    </div>
  );
};
