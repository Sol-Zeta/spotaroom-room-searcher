import React from 'react';
import useTranstaltion from 'next-translate/useTranslation';
import { Card } from '../Card';
import { IPropertiesDetail } from '../../types';
import { capitalizeFirstLetter } from '../../utils';
import styles from './CardList.module.scss'

interface Props {
    list: IPropertiesDetail [] | [];
} 

export const CardList = ({list}: Props) => {

    const { t } = useTranstaltion()

const renderCards = () => list.map((e:IPropertiesDetail, i:number)=>(
    <Card 
        key={i}
        title={e.title}
        price={e.monthlyPrice.minimumPrice}
        currency={e.currencySymbol}
        street={e.location.street}
        image={e.mainPhotoUrl}
        index={i}
        primaryText={capitalizeFirstLetter(t("common:more_details"))}
        primaryClick={()=>{}}
        secondaryText={capitalizeFirstLetter(t("common:book_now"))}
        secondaryClick={()=>{}}
    />
))

  return (
      <>
      {list.length ? (
            <div className={styles.cards_container}>
            {renderCards()}
            </div>
        ) : (
         <div>NO HAY RESULTADOS PARA MOSTRAR</div>   
        )}
      </>
  )
}
