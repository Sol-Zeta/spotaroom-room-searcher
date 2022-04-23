import { useState, useEffect, useContext } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { PropertiesContext } from "../context";
import { Head, Footer } from "../components";
import styles from "../../styles/Home.module.css";

const Home: NextPage = () => {
  const [propertiesList, setPropertiesList] = useState<any>([]);
  const [cityFilter, setCityFilter] = useState('');
  const [lowestPriceFirst, setLowestPriceFirst] = useState(true);
  const [propertiesType, setPropertiesType] = useState('')

  const { isLoadingProperties, properties, getProperties } =
    useContext(PropertiesContext);

  useEffect(() => {
    getProperties();
  }, []);

  useEffect(() => {
    if (!isLoadingProperties && properties.length) {
      setPropertiesList(properties);
      console.log("home", properties);
    }
  }, [properties]);

  useEffect(() => {

  }, [lowestPriceFirst, propertiesType])
  

  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <section>
          <button onClick={()=> setLowestPriceFirst(false)}>MÁS CAROS</button>
          <button onClick={()=> setLowestPriceFirst(true)}>MÁS BARATOS</button>
          <button onClick={()=> setPropertiesType('rooms')}>SOLO HABITACIONES</button>
          <button onClick={()=> setPropertiesType('apartments')}>SOLO APARTAMENTOS</button>
        </section>
        <section>
          <article>
            {propertiesList.map((e: any, i: number) => (
              <div key={i}>
                <h2>{i+1}</h2>
                <p>{e.title}</p>
                <p>{`${e.pricePerMonth} ${e.currencySymbol || '€'}`}</p>
                <p>{e.location.street}</p>
                <p>{e.location.postalCode}</p>
                <p>{e.price}</p>
                {e.photos.map((img: any, i: number) => (
                  <Image key={i} src={img.src} alt={e.title} width={'100%'} height={'100%'}/>
                ))}
              </div>
            ))}
          </article>
          <article>{/* pagination */}</article>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
