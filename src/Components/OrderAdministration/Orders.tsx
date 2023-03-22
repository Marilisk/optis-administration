import c from './Orders.module.scss';
import { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { LoadingStatusEnum } from '../../types/types';
import { fetchAllOrders } from '../../redux/ordersSlice';
import { OrderRows } from './OrderRows/OrderRows';
import { HeadCells } from './HeadCells/HeadCells';

interface IOrdersProps {
    authIsLoading: string
    isAuth: boolean
}

export const Orders: FC<IOrdersProps> = ({ authIsLoading, isAuth }: IOrdersProps) => {
    const userName = useAppSelector(s => s.auth.loginData.data?.fullName);
    const orders = useAppSelector(s => s.orders.orders.items)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAllOrders())
    }, [dispatch])

    if (authIsLoading === LoadingStatusEnum.loading || !orders) {
        return <div>
            <h2>{userName}, у вас пока нет заказов...</h2>
        </div>;
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
