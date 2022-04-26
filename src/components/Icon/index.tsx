import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from './Icon.module.scss';

interface Props {
  icon: IconProp;
  light?: boolean;
}

export const Icon = ({ icon, light }: Props) => (
  <div className={styles.container}>
    <FontAwesomeIcon icon={icon} color={light ? '#E6E4E5' : '#131213'}/>
  </div>
);
