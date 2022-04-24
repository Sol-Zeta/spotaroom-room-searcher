import { useState, useEffect, useContext, useRef } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { Head, Footer, TextInput } from "../components";
import { PropertiesContext } from "../context";
import { createFileName, downloadFile } from "../utils";
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

  let downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (properties) {
      setPropertiesList(properties);
    }
  }, [properties]);

  useEffect(() => {
    setPage(activePage);
  }, [activePage]);

  const handleSearchClick = () => setCityFilter(city);

  const handleDownloadFile = () =>
    downloadFile(JSON.stringify(properties), "text/JSON", downloadLinkRef);


  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <section className={styles.filters_container}>
          <TextInput value={cityFilter} onChange={setCity} />
          <button onClick={handleSearchClick}>BUSCAR</button>
          <button onClick={() => setPriceOrder("des")}>MÁS CAROS</button>
          <button onClick={() => setPriceOrder("asc")}>MÁS BARATOS</button>
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
