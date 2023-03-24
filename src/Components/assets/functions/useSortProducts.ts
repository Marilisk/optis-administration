import { /* ILensProduct,  */IProduct } from './../../../types/types';
import { useAppSelector } from "../../../redux/hooks";


export const useSortEyeWear = (array: IProduct[]) => {
    const chosenTag = useAppSelector(s => s.filters.sortTags.chosenTagId)

    if (chosenTag === 1) {
        return array;
    }
    let result = [...array]

    if (chosenTag === 2) {
        result.sort((a, b) => b.price - a.price)
    } else if (chosenTag === 3) {
        result.sort((a, b) => a.price - b.price)
    } else if (chosenTag === 4) {
        const withQuantities = result.filter(el => el.inStockQuantity !== undefined)
        withQuantities.sort((a: any, b: any) =>  b.inStockQuantity - a.inStockQuantity)
        result = withQuantities
    } else if (chosenTag === 5) {
        const withQuantities = result.filter(el => el.inStockQuantity !== undefined)
        withQuantities.sort((a: any, b: any) =>  a.inStockQuantity - b.inStockQuantity)
        result = withQuantities
    } else if (chosenTag === 6) {
        result.sort((a, b) => b.buyCount - a.buyCount)
    } else if (chosenTag === 7) {
        result.sort((a, b) => b.buyCount - a.buyCount)
    }

    return result;
}