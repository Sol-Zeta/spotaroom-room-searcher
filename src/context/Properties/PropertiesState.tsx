import { useReducer, useEffect } from "react";
import axios from "axios";
import PropertiesReducer from "./PropertiesReducer";
import PropertiesContext from "./PropertiesContext";
import { createIdsUrl } from '../../utils';
const apiUrl = process.env.API_BASE_URL;
interface Props {
  children: JSX.Element | JSX.Element[];
}

const PropertiesState = ({ children }: Props) => {
  const initialState = {
    isLoadingProperties: true,
    propertiesId: [],
    properties: [],
    selectedProperty: null,
    priceOrder: 'asc',
    typeFilter: '',
    city: 'madrid'
  };

  const [propertiesState, dispatch] = useReducer(
    PropertiesReducer,
    initialState
  );

  const {propertiesId, properties, priceOrder, typeFilter} = propertiesState;

 
  
  const setCity = (city:string) => dispatch({...propertiesState, city})

  const getPropertiesIds = async (city: string = 'madrid') => {
    const response = await axios.get(
      `${apiUrl}markers/${city}`
    );
    const {
      status,
      data: { ok, data },
    } = response;
    if (status === 200) {
      console.log("getPropertiesIds", response);
      dispatch({
        type: "SET_PROPERTIES_IDS",
        payload: response,
      });
      return ok ? data : [];
    }
  };




  const getProperties = async (city: string = 'madrid', page: number = 0, limit: number = 30) => {
    const ids = await getPropertiesIds(city);
    const idsUrl = createIdsUrl(ids, page, limit);
    if (ids.length) {
      const response = await axios.get(
        `${apiUrl}homecards_ids?${idsUrl}`
      );
      const {
        status,
        data: { ok, data },
      } = response;
      console.log("getProperties", response);
      dispatch({
        type: "SET_PROPERTIES",
        payload: status === 200 && ok ? data.homecards : [],
      });
    }
  };

  useEffect(() => {
    getProperties()
  }, [])


  useEffect(() => {
    if(properties){
      dispatch({
        ...propertiesState,
        isLoadingProperties: false
      })
    }
  }, [properties])

  useEffect(() => {
    getPropertiesIds()
  }, [priceOrder, typeFilter])

  const contextValue = {
    properties: propertiesState.properties ?? [],
    selectedProperty: propertiesState.selectedProperty ?? [],
    getPropertiesIds,
    getProperties,
    setCity
  };

  return (
    <PropertiesContext.Provider value={contextValue}>
      {children}
    </PropertiesContext.Provider>
  );
};

export default PropertiesState;
