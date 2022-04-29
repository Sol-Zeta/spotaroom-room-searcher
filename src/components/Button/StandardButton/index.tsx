import React, {useState} from "react";
import styles from "./StandardButton.module.scss";

interface Props {
  text: string;
  customStyles?: any;
  secondary?: boolean;
  onClick: () => void;
  children?: JSX.Element | JSX.Element[];
}

export const StandardButton = ({ text, customStyles, onClick, secondary, children }: Props) => {
  
  const [isClicked, setIsClicked] = useState(false)
  
  return (
    <button
      data-testid="standard-button"
      className={`
        ${styles.container} 
        ${secondary && styles.secondary_container} 
        ${isClicked && styles.clicked}
        ${customStyles}
      `}
      onClick={onClick}
      onMouseDown={()=> setIsClicked(true)}
      onMouseUpCapture={()=> setIsClicked(false)}
    >
      <p className={`${styles.text} ${secondary && styles.secondary_text}`}>
        {text}
      </p>
      {children}
    </button>
  );
};
