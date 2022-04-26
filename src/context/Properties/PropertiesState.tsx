import { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import PropertiesReducer from './PropertiesReducer';
import PropertiesContext from './PropertiesContext';
import { IPropertiesId } from '../../types';
import { createIdsUrl, createTypesUrl, orderByPrice } from '../../utils';
const apiUrl = process.env.API_BASE_URL;
interface Props {
  children: JSX.Element | JSX.Element[];
}
const initialState = {
  isContextReady: true,
  isLoadingProperties: false,
  propertiesIds: [],
  properties: [],
  selectedProperty: null,
  priceOrder: 'asc',
  typeFilter: [],
  cityFilter: 'madrid',
  page: 1,
  itemsPerPage: 30,
  totalProperties: 0
};

const PropertiesState = ({ children }: Props) => {
  const [propertiesState, dispatch] = useReducer(
    PropertiesReducer,
    initialState
  );

  const {
    isLoadingProperties,
    isContextReady,
    propertiesIds,
    properties,
    priceOrder,
    typeFilter,
    cityFilter,
    page,
    itemsPerPage,
    totalProperties,
  } = propertiesState;

  const setCityFilter = (cityFilter: string) =>
    dispatch({ type: 'SET_CITY', payload: cityFilter ? cityFilter.toLocaleLowerCase() : 'madrid' });
  const setPriceOrder = (priceOrder: string) =>
    dispatch({ type: 'SET_PRICE_ORDER', payload: priceOrder });
  const setTypeFilter = (typeFilter: string[]) =>
    dispatch({ type: 'SET_TYPE_FILTER', payload: [...typeFilter] });
  const setPage = (page: number) =>
    dispatch({ type: 'SET_PAGE', payload: page });
  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: itemsPerPage });

  const getPropertiesIds = async (city: string = 'madrid', order: string, type: string) => {
    const typesUrl = type.length && createTypesUrl(typeFilter, page, itemsPerPage)
    const url = type.length ? `${apiUrl}markers/${city}?${typesUrl}` : `${apiUrl}markers/${city}`
    console.log(url, type)
    const response = await axios.get(url);
    const {
      status,
      data: { ok, data },
    } = response;
    if (status === 200 && ok) {
      const orderedProperties = orderByPrice(data, order, false);
      dispatch({
        type: 'SET_PROPERTIES_IDS',
        payload: orderedProperties,
      });
    }
  };

  const getProperties = async (
    ids: IPropertiesId[],
    page: number = 0,
    limit: number = 30
  ) => {
    try {
      dispatch({type: 'SET_IS_LOADING', payload: true})
      console.log("lo que llega", ids[0])
      const idsUrl = createIdsUrl(ids, page, limit);
      if (propertiesIds.length) {
        const response = await axios.get(`${apiUrl}homecards_ids?${idsUrl}`);
        const {
          status,
          data: { ok, data },
        } = response;
        const orderedProperties = orderByPrice(data.homecards, priceOrder, true);
        dispatch({
          type: 'SET_PROPERTIES',
          payload: status === 200 && ok ? [...orderedProperties] : [],
        });
      }
    } catch (error) {
      console.error(error)
      dispatch({
        type: 'SET_PROPERTIES',
        payload: [],
      });
      throw error
    } finally {
      dispatch({type: 'SET_IS_LOADING', payload: false})
    }
  };

  useEffect(() => {
    console.log('***************', page)
  }, [page])
  

  useEffect(() => {
    getPropertiesIds(cityFilter, priceOrder, typeFilter);
  }, [cityFilter, typeFilter]);

  useEffect(() => {
    const orderedIds = orderByPrice(propertiesIds, priceOrder, false)
    dispatch({
      type: 'SET_PROPERTIES_IDS',
      payload: [...orderedIds]
    })
  }, [priceOrder])

  useEffect(() => {
    if (propertiesIds.length) {
      getProperties(propertiesIds, page, itemsPerPage);
    }
  }, [propertiesIds, page, itemsPerPage]);

  useEffect(() => {
    if (properties) {
      dispatch({
        ...propertiesState,
        isLoadingProperties: false,
      });
    }
  }, [properties]);

  const contextValue = {
    isContextReady,
    properties: propertiesState.properties ?? [],
    totalProperties,
    page,
    cityFilter,
    priceOrder,
    itemsPerPage,
    selectedProperty: propertiesState.selectedProperty ?? [],
    getPropertiesIds,
    getProperties,
    setCityFilter,
    setPriceOrder,
    setTypeFilter,
    setPage,
    setItemsPerPage,
  };

  return (
    <PropertiesContext.Provider value={contextValue}>
      {children}
    </PropertiesContext.Provider>
  );
};

export default PropertiesState;
