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
  StandardButton,
} from "../components";
import { createFileName, createHref, downloadFile, capitalizeWords } from "../utils";
import { cityOptions, propertiesTypesOptions } from "../data";

import styles from "../../styles/Home.module.scss";
import { CheckboxInput } from "../components/FormInputs/CheckboxInput";

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
    console.log("CONTEXT READY", isContextReady);
  }, [isContextReady]);

  const translateCities = (options: string[]) =>
    options.map((e: string) => ({
      label: capitalizeWords(e ? t(`cities:${e}`) : ''),
      id: e,
    }));

  const formatOptions = (options: string[]) => {
    return options.map((e:string)=>(
      {
        label: t(`common:${e}`),
        id: e
      }
    ))
  }

  const handleSearchClick = () => setCityFilter(city);

  const handleAutocompleteChange = (value: string) => value !== "any_city" ? setCity(value) : setCity("");

  const handleDownloadFile = () =>
    downloadFile(JSON.stringify(properties), createFileName(typeFilter), "text/plain", downloadLinkRef);
  
  
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
              label={t("common:choose_a_city")}
              defaultValue={{label: t(`cities:${cityFilter}`), id: cityFilter}}
              noOptionsText={"No hay resultados para mostrar"}
              options={translateCities(cityOptions)}
              onChange={handleAutocompleteChange}
            />
            <IconButton icon={"search"} onClick={handleSearchClick} light/>
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
          <div className={styles.filter_container}>
            <CheckboxInput 
              title={t("common:filter")}
              options={formatOptions(propertiesTypesOptions)}
              selected={typeFilter}
              onChange={setTypeFilter}
            />
          </div>
          <div className={styles.filter_container}>
            <StandardButton 
              text={t("common:download_list")} 
              onClick={handleDownloadFile}>
              <a
                ref={downloadLinkRef}
              />
            </StandardButton>
          </div>
        </section>
        <section className={styles.cards_container}>
          <article className={styles.pagination_container}>
            <Pagination
              totalPages={Math.ceil(totalProperties/itemsPerPage)}
              activePage={page+1}
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
