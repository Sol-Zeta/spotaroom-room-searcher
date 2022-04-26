import React from "react";
import { Icon } from "../../Icon";
import { icons } from "../../../assetsRoutes";
import styles from "./IconButton.module.scss";

interface Props {
  icon: keyof typeof icons;
  light?: boolean;
  onClick: () => void;
}

export const IconButton = ({ icon, light, onClick }: Props) => {
  return (
    <button onClick={onClick} className={styles.container}>
      <Icon icon={icons[icon]} light={light}/>
    </button>
  );
};
