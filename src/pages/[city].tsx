import { useState, useEffect, useContext, useRef } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { PropertiesContext } from "../context";
import {
  IconButton,
  Head,
  AutoCompleteInput,
  SelectInput,
  CardList,
  Pagination,
  StandardButton,
} from "../components";
import { createFileName, downloadFile, capitalizeWords } from "../utils";
import { cityOptions, propertiesTypesOptions } from "../data";

import styles from "../../styles/Home.module.scss";
import { CheckboxInput } from "../components/FormInputs/CheckboxInput";

const Home: NextPage = () => {
  const {
    isContextReady,
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
  } = useContext(PropertiesContext);
  const [city, setCity] = useState(cityFilter);
  const { t } = useTranslation();

  const router = useRouter();

  let downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (router.query.city) {
      setCity(router.query.city);
      setCityFilter(router.query.city);
    }
  }, []);


  const translateCities = (options: string[]) =>
    options.map((e: string) => ({
      label: capitalizeWords(e ? t(`cities:${e}`) : ""),
      id: e,
    }));

  const formatOptions = (options: string[]) => {
    return options.map((e: string) => ({
      label: t(`common:${e}`),
      id: e,
    }));
  };

  const handleSearchClick = () => setCityFilter(city);

  const handleAutocompleteChange = (value: string) =>
    value !== "any_city" ? setCity(value) : setCity("");

  const handleDownloadFile = () =>
    downloadFile(
      JSON.stringify(properties),
      createFileName(typeFilter),
      "text/plain",
      downloadLinkRef
    );

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
              width={"80%"}
              label={t("common:choose_a_city")}
              defaultValue={{
                label: t(`cities:${cityFilter}`),
                id: cityFilter,
              }}
              noOptionsText={"No hay resultados para mostrar"}
              options={translateCities(cityOptions)}
              onChange={handleAutocompleteChange}
            />
            <IconButton icon={"search"} onClick={handleSearchClick} light />
          </div>
          <div className={styles.filter_container}>
            <SelectInput
              width={"100%"}
              label={t("common:order")}
              value={priceOrder}
              options={[
                { label: t("common:ascending_price"), id: "asc" },
                { label: t("common:descending_price"), id: "des" },
              ]}
              onChange={setPriceOrder}
            />
          </div>
          <div className={styles.checkbox_button_container}>
            <div className={styles.checkbox_container}>
              <CheckboxInput
                title={t("common:filter")}
                options={formatOptions(propertiesTypesOptions)}
                selected={typeFilter}
                onChange={setTypeFilter}
              />
            </div>
            <div className={styles.button_container}>
              <StandardButton
                text={t("common:download_list")}
                onClick={handleDownloadFile}
              >
                <a ref={downloadLinkRef} />
              </StandardButton>
            </div>
          </div>
        </section>
        <section className={styles.cards_container}>
          <article className={styles.pagination_container}>
            <Pagination
              totalPages={Math.ceil(totalProperties / itemsPerPage)}
              activePage={page + 1}
              onChange={setPage}
            />
          </article>
          <CardList list={properties} />
        </section>
      </main>
    </div>
  );
};

export default Home;
