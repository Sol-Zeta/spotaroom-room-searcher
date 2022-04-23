// TODO: complete the interface
export type IPropertiesDetail = any;

export interface IPropertiesState {
    isLoadingProperties: boolean,
    propertiesId: string[],
    properties: IPropertiesDetail[],
    selectedProperty?: boolean | null ,
}     

export interface IPropertiesId {
  adId: number;
  coord: number[];
  id: number;
  instantBooking: boolean;
  isSelect: boolean;
  minimumPrice: number;
  relevance: number;
}
