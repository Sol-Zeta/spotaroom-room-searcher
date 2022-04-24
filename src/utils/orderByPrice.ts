import { IPropertiesId , IPropertiesDetail} from '../types';

export const orderByPrice = (items: any, order: string, isDetail: boolean) => {
    if(isDetail){
        return items.sort((a: IPropertiesDetail, b: IPropertiesDetail)=> order === 'asc' ? a.monthlyPrice.minimumPrice - b.monthlyPrice.minimumPrice : b.monthlyPrice.minimumPrice - a.monthlyPrice.minimumPrice)
    } else {
        return items.sort((a: IPropertiesId, b: IPropertiesId)=> order === 'asc' ? a.minimumPrice - b.minimumPrice : b.minimumPrice - a.minimumPrice)
    }
    
}
