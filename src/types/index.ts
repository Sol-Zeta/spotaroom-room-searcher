// TODO: complete the interface
export interface IPropertiesState {
    isLoadingProperties: boolean;
    propertiesId: string[];
    properties: IPropertiesDetail[];
    selectedProperty?: boolean | null ;
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

export interface IPropertiesDetail {
  adId: number;
  aptFeatures?: number[];
  bookingConditions?: {
    securityDepositType: string; 
    securityDepositValue: number; 
    adminFeeType: string; 
    adminFeeValue: number; 
    contractDurationTypesAllowed: any;
  }
  cancellationPolicy: string;
  checked: boolean;
  city: string;
  contractDurationTypesAllowed: null | string;
  currencyIsoCode: string;
  currencyLabel: string;
  currencySymbol: string;
  favorite: boolean;
  features?: any;
  firstAvailableDate: string;
  id: number;
  instantBooking: {isEnabled: boolean; rules: any};
  isNew: Boolean;
  isSuperlister: boolean;
  landlordId: string;
  location: {street: string; postalCode: string; city: string};
  mainPhotoUrl: string;
  monthlyPrice:{
    fixedPrice: number;
    minimumPrice: number;
    type: string;
  };
  neighborhoodName: string;
  numberOfBathrooms: number;
  numberOfBedrooms: number;
  offers?: any | [];
  photoUrls: {
    homecardHidpi: string; homecard: string};
  photos: any;
  plan: string;
  pricePerMonth: number;
  refreshAvailabilitiesDate: string;
  relevance: null
  reviews: {count: number; ratingAverage: number;}
  roomFeatures: number[] | [];
  roomId: number;
  roomType: number[] | [];
  runnerName: string;
  score: {points: number; label: string};
  sharedRoom: boolean;
  suitFeatures: number [] | [];
  title: string;
  type: string;
  url: string;
  visited: boolean;
}


export interface ICityOptions {
  label: string;
}

export interface IRoutesOptions {
  title: string;
  url: string;
}

