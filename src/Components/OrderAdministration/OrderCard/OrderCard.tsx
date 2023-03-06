import c from './OrderCard.module.scss';
import { useEffect, FC, useState } from 'react';
import instance from '../../../redux/API/api';
import { useAppDispatch } from '../../../redux/hooks';
import { IOrder } from '../../../types/types';
import { LoadingDots } from '../../assets/Preloader/LoadingDots/LoadingDots';


interface IOrderCard {
    order: IOrder
}

export const OrderCard: FC<IOrderCard> = ({ order }: IOrderCard) => {
    const dispatch = useAppDispatch()

    

    useEffect(() => {
        //fetchOrder(orderId, setOrder)
    }, [])

    
    if (!order) {
        return <LoadingDots />
    }

    //const date = new Date(order.createdAt)
    //const createDate = date.toLocaleDateString('ru-RU')

    let condition = '';
    switch (order.condition) {
        case 'created':
            condition = 'Создан';
            break;
        case 'confirmed':
            condition = 'Подтверждён';
            break;
        case 'deleted':
            condition = 'Отменён';
            break;
        case 'processed':
            condition = 'в обработке у менеджера';
            break;
    }


    return <div className={c.card}>
        <div>
            Заказ от {/* {createDate} */} г.
            {/* Доставка по адресу {order.address} */}
        </div>

        <div>
            {condition}
        </div>

        <div>
            {order.paymentMade? 'Оплачен' : 'Не оплачен'}
        </div>

        <div className={c.deleteOrder}
            /* onClick={() => dispatch(fetchDeleteOrder(orderId))} */>
            Отменить заказ
        </div>
    </div>
}

