import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Image from "next/image";
import {Footer, Icon, TabletMenu} from "../../components";
import { navigationRoutes } from '../NavigationRoutes';
import { images, icons } from "../../assetsRoutes";
import { IRoutesOptions } from '../../types';
import styles from "./Navigation.module.scss";

interface Props {
  children: JSX.Element | JSX.Element[];
}


const Navigation = ({children}: Props): JSX.Element => {
  const [currentLink, setCurrentLink] = useState(0)

  const { t } = useTranslation();

  const renderRoutes = () => {
      return navigationRoutes.map((e:IRoutesOptions, i:number) =>{
        return (
          <li key={i} className={styles.list_item}>
            <Link href={e.url}>
              <a
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
              <div className={styles.nav_tablet}>
                <TabletMenu routes={navigationRoutes}/>
              </div>
          </div>
        </nav>
            {children}
          <Footer />
        </div>
  );
};

export default Navigation;
