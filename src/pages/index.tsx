import { useState, useEffect, useContext, useRef } from "react";
import type { NextPage } from "next";
import useTranslation from 'next-translate/useTranslation';
import Image from "next/image";
import { PropertiesContext } from "../context";
import { IconButton, Head, Footer, AutoCompleteInput, SelectInput } from "../components";
import { createFileName, downloadFile, capitalizeWords } from "../utils";
import { cityOptions } from "../data";

import styles from "../../styles/Home.module.scss";

const Home: NextPage = () => {
  const {
    isLoadingProperties,
    properties,
    priceOrder,
    setPriceOrder,
    cityFilter,
    setCityFilter,
    typeFilter,
    setTypeFilter,
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage,
  } = useContext(PropertiesContext);
  const [propertiesList, setPropertiesList] = useState<any>([]);
  const [city, setCity] = useState(cityFilter);
  const [activePage, setActivePage] = useState(page);
  const [types, setTypes] = useState([]);
  const [fileToDownload, setFileToDownload] = useState("");
  const [href, setHref] = useState("");

  const { t } = useTranslation()

  let downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (properties) {
      setPropertiesList(properties);
    }
  }, [properties]);

  useEffect(() => {
    setPage(activePage);
  }, [activePage]);

  const translateCities = (options: string[]) => options.map((e:string)=>({label: capitalizeWords(t(`cities:${e}`)), id: e}))
  
  const handleSearchClick = () => setCityFilter(city);

  const handleAutocompleteChange = (value: string) => value !== 'any_city' ? setCity(value) : setCity('');

  const handleDownloadFile = () =>
    downloadFile(JSON.stringify(properties), "text/JSON", downloadLinkRef);


  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <section className={styles.filters_container}>
          <div className={styles.filter_container}>
            <AutoCompleteInput 
              label={t("common:city")}
              value={cityFilter}
              noOptionsText={'No hay resultados para mostrar'}
              options={translateCities(cityOptions)}
              onChange={handleAutocompleteChange}
            />
            <IconButton icon={'search'} onClick={handleSearchClick}/>
          </div>
          <div className={styles.filter_container}>
            <SelectInput 
              label={t("common:order")}
              value={priceOrder}
              options={[
                {label: t("common:ascending_price"), id: 'asc'},
                {label: t("common:descending_price"), id: 'des'}
              ]}
              onChange={setPriceOrder}
            />
          </div>
          <button onClick={() => setTypeFilter([...types, "rooms"])}>
            SOLO HABITACIONES
          </button>
          <button onClick={() => setTypeFilter("apartments")}>
            SOLO APARTAMENTOS
          </button>
          <button onClick={() => setActivePage(4)}>PÁGINA 5</button>
          <button onClick={() => setActivePage(0)}>PÁGINA 1</button>
          <button onClick={handleDownloadFile}>
            DESCARGAR LISTADO
            <a
              ref={downloadLinkRef}
              href={href}
              download={() => createFileName(typeFilter)}
            />
          </button>
        </section>
        <section className={styles.cards_container}>
          <article>
            {propertiesList.map((e: any, i: number) => (
              <div key={i}>
                <h2>{i + 1}</h2>
                <p>{e.title}</p>
                <p>{`${e.pricePerMonth} ${e.currencySymbol || "€"}`}</p>
                <p>{e.location.street}</p>
                <p>{e.location.postalCode}</p>
                <p>{e.price}</p>
                {e.photos.map((img: any, i: number) => (
                  <Image
                    key={i}
                    src={img.src}
                    alt={e.title}
                    width={"100%"}
                    height={"100%"}
                  />
                ))}
              </div>
            ))}
          </article>
          <article className={styles.pagination_container}>
            {/* pagination */}
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
