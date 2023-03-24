import c from './Orders.module.scss';
import { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAllOrders } from '../../redux/ordersSlice';
import { OrderRows } from './OrderRows/OrderRows';
import { HeadCells } from './HeadCells/HeadCells';
import { LoadingDotsPreloader } from '../assets/Preloader/LoadingDots/LoadingDotsPreloader';


export const Orders: FC = () => {
    const orders = useAppSelector(s => s.orders.orders.items)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAllOrders())
    }, [dispatch])

    if (!orders) {
        return <LoadingDotsPreloader />
    }

    return <div className={c.wrapper}>

        <table className={c.table}>
        
            <thead>
                <HeadCells />
            </thead>
            
            <tbody>
                <OrderRows orders={orders} />
            </tbody>
            
        </table>

    </div>



}
