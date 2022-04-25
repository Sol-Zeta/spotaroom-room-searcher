import React from 'react';
import { Icon } from '../../Icon';
import { icons } from '../../../assetsRoutes';
import styles from './IconButton.module.scss';




interface Props {
    icon: keyof typeof icons;
    onClick: () => void;
}

export const IconButton = ({icon, onClick}: Props) => {
  return (
    <button
        className={styles.container}
    >
        <Icon icon={icons[icon]}/>
    </button>
  )
}
