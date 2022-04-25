import React from 'react';
import LoaderIcon from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from './AppLoader.module.scss'

interface Props {
    text?: string;
}

export const AppLoader = ({text}: Props) => {
    return (
        <div className={styles.background}>
            <div className={styles.main_container}>
                <LoaderIcon 
                type="Grid"
                color="#e72986"
                height={200}
                width={200}
                />
                <p className={styles.text}>{text}</p>
            </div>
        </div>
    )
}