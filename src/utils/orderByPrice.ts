import { IPropertiesId } from '../types';

// export const orderByPrice = (items: IPropertiesId[], order: string) => {
//     if(order === 'asc'){
//         const ordered = items.sort((a: IPropertiesId, b: IPropertiesId)=> a.minimumPrice - b.minimumPrice)
//         console.log("ordenados", ordered.map(e=>e.minimumPrice))
//         return ordered;
//     } else if(order === 'des'){
        
//     }
// }
export const orderByPrice = (items: IPropertiesId[], order: string) => items.sort((a: IPropertiesId, b: IPropertiesId)=> order === 'asc' ? a.minimumPrice - b.minimumPrice : b.minimumPrice - a.minimumPrice)
