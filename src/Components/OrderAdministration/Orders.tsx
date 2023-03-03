import c from './Orders.module.scss';
import { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { OrderCard } from './OrderCard/OrderCard';
import { LoadingStatusEnum } from '../../types/types';
import { useDispatch } from 'react-redux';
import { fetchAllOrders } from '../../redux/ordersSlice';

interface IOrdersProps {
    authIsLoading: string
    isAuth: boolean
}

export const Orders: FC<IOrdersProps> = ({ authIsLoading, isAuth }: IOrdersProps) => {
    const userName = useAppSelector(s => s.auth.loginData.data?.fullName);
    const orders = useAppSelector(s => s.auth.loginData.data?.orders)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    useEffect( () => {
        dispatch(fetchAllOrders())
    }, [])
    
    if (authIsLoading === LoadingStatusEnum.loading || !orders ) {
        return <div><h2>{userName}, у вас пока нет заказов...</h2></div>;
    }

    const elements = orders.map((order, i) => {
        return <OrderCard key={i} orderId={order} />
    })


    return <div className={c.wrapper}>

        <h1 className={c.header}>
            <h3>Заказы</h3>
        </h1>

        <div >
            {elements}
        </div>
        
    </div>



}
