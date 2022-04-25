import React from 'react';
import styles from './StandardButton.module.scss';




interface Props {
    text: string;
    onClick: () => void;
}

export const StandardButton = ({text, onClick}: Props) => {
  return (
    <button
        className={styles.container}
    >
        <p>{text}</p>
    </button>
  )
}
