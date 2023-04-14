import c from './Orders.module.scss';
import { useEffect, FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAllOrders } from '../../redux/ordersSlice';
import { OrderRows } from './OrderRows/OrderRows';
import { HeadCells } from './HeadCells/HeadCells';
import { LoadingDotsPreloader } from '../assets/Preloader/LoadingDots/LoadingDotsPreloader';
import { OrderCard } from './OrderCard/OrderCard';
import { useParams } from 'react-router-dom';
import { OrderFilter } from './OrderFilter/OrderFilter';
import { useFilterOrders } from '../assets/functions/useFilterOrders';


export const Orders: FC = () => {
    const orders = useAppSelector(s => s.orders.orders.items)
    const dispatch = useAppDispatch()
    const [currentOrderId, setCurrentOrderId] = useState<string | null>(null)
    const { step } = useParams()
    const filteredOrders = useFilterOrders(orders, step)
    filteredOrders.sort((o1, o2) => new Date(o2.createdAt).getTime() - new Date(o1.createdAt).getTime())

    useEffect(() => {
        dispatch(fetchAllOrders())
    }, [dispatch])

    if (!orders.length) {
        return <LoadingDotsPreloader />
    }


    return <div className={c.wrapper}>
        <div className={c.header}>
            <h2>дата создания:</h2><OrderFilter />
        </div>

        <table className={c.table}>

            <thead>
                <HeadCells />
            </thead>

            <tbody>
                <OrderRows orders={filteredOrders} setCurrentOrderId={setCurrentOrderId} />
            </tbody>

        </table>

        {currentOrderId &&
            <OrderCard orderId={currentOrderId} setCurrentOrderId={setCurrentOrderId} />
        }
    </div>
}
