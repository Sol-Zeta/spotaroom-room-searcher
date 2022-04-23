
interface IAction {
  payload: any;
  type: string;
}

const reducer = (state: any, action: IAction) => {
  const { payload, type }: { payload: any; type: string } = action;
  const typeOptions: any = {
    SET_PROPERTIES: { ...state, properties: payload },
    SET_PROPERTIES_IDS: { ...state, propertiesIds: payload },
    DEFAULT: state,
  };
  return typeOptions[type] ?? typeOptions["DEFAULT"];
};

export default reducer;
