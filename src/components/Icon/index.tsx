import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from './Icon.module.scss';

interface Props {
  icon: IconProp;
}

export const Icon = ({ icon }: Props) => (
  <div className={styles.container}>
    <FontAwesomeIcon icon={icon} />
  </div>
);
