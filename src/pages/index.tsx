import { useState, useEffect, useContext, useRef } from "react";
import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { PropertiesContext } from "../context";
import {
  IconButton,
  Head,
  Footer,
  AutoCompleteInput,
  SelectInput,
  CardList,
  Pagination,
} from "../components";
import { createFileName, downloadFile, capitalizeWords } from "../utils";
import { cityOptions } from "../data";

import styles from "../../styles/Home.module.scss";

const Home: NextPage = () => {
  const {
    isContextReady,
    isLoadingProperties,
    properties,
    totalProperties,
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
  const [activePage, setActivePage] = useState(1);
  const [types, setTypes] = useState([]);
  const [fileToDownload, setFileToDownload] = useState("");
  const [href, setHref] = useState("");

  const { t } = useTranslation();

  let downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (properties) {
      setPropertiesList(properties);
    }
  }, [properties]);

  useEffect(() => {
    setPage(activePage);
  }, [activePage]);

  useEffect(() => {
    console.log("CONTEXT READY", isContextReady);
  }, [isContextReady]);

  const translateCities = (options: string[]) =>
    options.map((e: string) => ({
      label: capitalizeWords(t(`cities:${e}`)),
      id: e,
    }));

  const handleSearchClick = () => setCityFilter(city);

  const handleAutocompleteChange = (value: string) =>
    value !== "any_city" ? setCity(value) : setCity("");

  const handleDownloadFile = () =>
    downloadFile(JSON.stringify(properties), "text/JSON", downloadLinkRef);

  if (isContextReady !== true) {
    return <p>CARGANDO</p>;
  }

  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <section className={styles.filters_container}>
          <div className={styles.filter_container}>
            <AutoCompleteInput
              label={t("common:city")}
              value={cityFilter}
              noOptionsText={"No hay resultados para mostrar"}
              options={translateCities(cityOptions)}
              onChange={handleAutocompleteChange}
            />
            <IconButton icon={"search"} onClick={handleSearchClick} />
          </div>
          <div className={styles.filter_container}>
            <SelectInput
              label={t("common:order")}
              value={priceOrder}
              options={[
                { label: t("common:ascending_price"), id: "asc" },
                { label: t("common:descending_price"), id: "des" },
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
          <article className={styles.pagination_container}>
            <Pagination
              totalPages={Math.floor(totalProperties/itemsPerPage)}
              activePage={page}
              onChange={setPage}
            />
          </article>
          <CardList list={properties} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
