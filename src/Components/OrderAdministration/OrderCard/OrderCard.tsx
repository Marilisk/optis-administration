import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchEditOrder } from "../../../redux/ordersSlice";
import { OrderConditionsType } from "../../../types/types";
import { determinateDate } from "../OrderRows/functions";
import { OrderUser } from "../OrderRows/OrderUser/OrderUser";
import { Manager } from "./Manager/Manager";
import c from './OrderCard.module.scss'
import { OrderNavBar } from "./OrderNavBar/OrderNavBar";
import { StatusChange } from "./StatusChange/StatusChange";

export type OrderTabType = 'user' | 'status' | 'updateDate' | 'notes' | 'responsibleManager' | 
    'deliveryDate' | 'courierNote'

export const OrderCard: FC = () => {
    const dispatch = useAppDispatch()
    const params = useParams()
    const orderId = params.id
    const navigate = useNavigate()
    const order = useAppSelector(s => s.orders.orders.items.find(el => el._id === orderId))
    const [activeTab, setActiveTab] = useState<OrderTabType>('user')

    useEffect(() => {
        if (!order) {
            navigate('/')
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
        <div className={c.darkBack} onClick={() => navigate('/')} />

        <div className={c.window}>

            <h2>Заказ создан {determinateDate(order.createdAt)}</h2>

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
                    примечания
                </div>
            }

            {
                activeTab === 'responsibleManager'
                &&
                <div>
                    <Manager manager={order.manager} />
                </div>
            }


            {
                activeTab === 'deliveryDate'
                &&
                <div>
                    планируемая дата доставки
                </div>
            }

            {
                activeTab === 'courierNote'
                &&
                <div>
                    примечание для курьера
                </div>
            }

        </div>
    </>

}