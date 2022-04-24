
interface IAction {
  payload: any;
  type: string;
}

const reducer = (state: any, action: IAction) => {
  const { payload, type }: { payload: any; type: string } = action;
  console.log(type)
  const typeOptions: any = {
    SET_IS_LOADING: { ...state, isLoadingProperties: payload },
    SET_PROPERTIES: { ...state, properties: payload },
    SET_PROPERTIES_IDS: { ...state, propertiesIds: payload },
    SET_CITY: {...state, cityFilter: payload},
    SET_PRICE_ORDER: {...state, priceOrder: payload},
    SET_TYPE_FILTER: {...state, typeFilter: payload},
    SET_PAGE: {...state, page: payload},
    SET_ITEMS_PER_PAGE: {...state, itemsPerPage: payload},
    DEFAULT: state,
  };
  return typeOptions[type] ?? typeOptions["DEFAULT"];
};

export default reducer;