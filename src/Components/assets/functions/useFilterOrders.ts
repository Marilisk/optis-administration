import { IOrder } from '../../../types/types';
import { useAppSelector } from "../../../redux/hooks";

const monthTimestamp = 2592000000
const weekTimestamp = 604800000
const dayTimestamp = 86400000

export const useFilterOrders = (array: IOrder[], step: string | undefined) => {

    const chosenTag = useAppSelector(s => s.orders.filters.chosenOption.id)

    let result = [...array]

    result = step === 'done' ?
        result.filter(order => order.condition === 'deleted' || order.condition === 'delivered') :
        result.filter(order => order.condition !== 'deleted' && order.condition !== 'delivered')

    if (chosenTag === 1) {
        return result;
    }
    const nowTimeStamp = Date.now()

    if (chosenTag === 2) {
        result = result.filter((order) => new Date(order.createdAt).getTime() > nowTimeStamp - monthTimestamp)
    } else if (chosenTag === 3) {
        result = result.filter((order) => new Date(order.createdAt).getTime() > nowTimeStamp - weekTimestamp)
    } else if (chosenTag === 4) {
        result = result.filter((order) => new Date(order.createdAt).getTime() > (nowTimeStamp - dayTimestamp))
    }

    return result;
}