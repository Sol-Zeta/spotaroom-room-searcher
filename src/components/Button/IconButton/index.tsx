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
    <button 
      data-testid='icon-button'
      onClick={onClick} 
      className={styles.container}
    >
      <Icon 
        data-testid='icon'
        icon={icons[icon]} 
        light={light}
      />
    </button>
  );
};
