import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router'
import {Footer} from "../../components";
import { navigationRoutes } from '../NavigationRoutes';
import { images } from "../../assetsRoutes";
import styles from "./Navigation.module.scss";

interface Props {
  children: JSX.Element | JSX.Element[];
}


const Navigation = ({children}: Props): JSX.Element => {
  const [currentLink, setCurrentLink] = useState(0)

  let { t } = useTranslation();

  const router = useRouter()

  const renderRoutes = () => {
      return navigationRoutes.map((e:any, i:number) =>{
        return (
          <li key={i} className={styles.list_item}>
            <Link href={e.url}>
              <a 
                target={e.target ? '_blank' : ''}
                className={`${styles.link} ${currentLink === i+1 && styles.link_current}`}>
                  {t(`common:${e.title}`)}
              </a>
            </Link>
          </li>
        )
      })
    }

  return (
    <div className={styles.main_container}>
        <nav className={styles.nav}>
          <div className={styles.nav_and_icon}>
            <Link href="/" passHref>
              <div className={styles.icon_container}>
                <Image 
                  src={images['logo']} 
                  alt="spot-a-room"
                  objectFit='contain'
                />
              </div>
            </Link>
              <ul className={styles.nav_links}>
                {renderRoutes()}
              </ul>
          </div>
        </nav>
            {children}
          <Footer />
        </div>
  );
};

export default Navigation;
