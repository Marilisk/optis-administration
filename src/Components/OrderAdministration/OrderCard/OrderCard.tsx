import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchEditOrder } from "../../../redux/ordersSlice";
import { OrderConditionsType } from "../../../types/types";
import { determinateDate } from "../OrderRows/functions";
import { OrderUser } from "../OrderRows/OrderUser/OrderUser";
import { DeliveryDate } from "./DeliveryDate/DeliveryDate";
import { Manager } from "./Manager/Manager";
import { Note } from "./ManagerNote/ManagerNote";
import c from './OrderCard.module.scss'
import { OrderNavBar } from "./OrderNavBar/OrderNavBar";
import { StatusChange } from "./StatusChange/StatusChange";

export type OrderTabType = 'user' | 'status' | 'updateDate' | 'notes' | 'responsibleManager' |
    'deliveryDate'


interface IOrderCardProps {
    orderId: string
    setCurrentOrderId: (arg: null) => void
}

export const OrderCard: FC<IOrderCardProps> = ({ orderId, setCurrentOrderId }: IOrderCardProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const order = useAppSelector(s => s.orders.orders.items.find(el => el._id === orderId))
    const [activeTab, setActiveTab] = useState<OrderTabType>('user')

    useEffect(() => {
        if (!order) {
            navigate('/orders/processed')
        }
    })

    if (!order) {
        return <div>заказ не найден</div>
    }
    const changeStatus = (condition: OrderConditionsType) => {
        dispatch(fetchEditOrder({ ...order, condition: condition }))
    }

    const updateDate = order.updatedAt ? determinateDate(order.updatedAt) : ''

    return <>
        <div className={c.darkBack} onClick={() => {
            dispatch(fetchEditOrder(order))
            setCurrentOrderId(null)
        }} />

        <div className={c.window}>

            <div className={c.header}>
                <h2>Заказ от: {determinateDate(order.createdAt)}</h2>
                <p>способ оплаты - {order.paymentWay === 'cash' ? 'наличные' : 'безналично'},
                    {order.paymentMade ?
                        <span className={c.ok}> оплачен</span> :
                        <span className={c.error}> не оплачен</span>}
                </p>
            </div>

            <OrderNavBar activeTab={activeTab} setActiveTab={setActiveTab} />

            {
                activeTab === 'user'
                &&
                <div>
                    <OrderUser userId={order.userId} phone={order.phoneNumber} />
                </div>
            }

            {
                activeTab === 'status'
                &&
                <div>
                    <StatusChange changeStatus={changeStatus} condition={order.condition} />
                </div>
            }

            {
                activeTab === 'updateDate' &&
                <div className={c.row}>
                    обновлено: {updateDate}
                </div>
            }

            {
                activeTab === 'notes'
                &&
                <div>
                    <Note order={order} />
                </div>
            }

            {
                activeTab === 'responsibleManager'
                &&
                <div>
                    <Manager order={order} />
                </div>
            }

            {
                activeTab === 'deliveryDate'
                &&
                <div>
                    <DeliveryDate createdAt={order.createdAt} address={order.address} />
                </div>
            }

        </div>
    </>
}