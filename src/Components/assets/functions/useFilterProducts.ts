import { IProduct } from './../../../types/types';
import { useAppSelector } from "../../../redux/hooks";


export const useFilterEyeWear = (array: IProduct[]) => {

    const chosenFilter = useAppSelector(s => s.filters.filters.chosenOption)

    if (chosenFilter.id === 4) {
        return array;
    }
    let result = [...array]

    if (chosenFilter.id === 3) {
        result = result.filter( el => el.features.includes('детские') || el.features.includes('подростковые') )
    } else {
        result = result.filter( el => el.gender.includes(chosenFilter.name) )
    } 
    
    return result;
}