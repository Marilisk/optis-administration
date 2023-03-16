import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchEditOrder } from "../../../redux/ordersSlice";
import { OrderConditionsType } from "../../../types/types";
import { determinateDate, determinateCondition } from "../OrderRows/functions";
import { OrderUser } from "../OrderRows/OrderUser/OrderUser";
import c from './OrderCard.module.scss'
import { StatusChange } from "./StatusChange/StatusChange";


interface IOrderCard {

}
export const OrderCard: FC<IOrderCard> = ({ }: IOrderCard) => {
    const dispatch = useAppDispatch()
    const params = useParams()
    const orderId = params.id
    const navigate = useNavigate()
    const order = useAppSelector(s => s.orders.orders.items.find(el => el._id === orderId))

    

    if (!order) {
        return <div>заказ не найден</div>
    }
    const changeStatus = (condition: OrderConditionsType) => {
        dispatch(fetchEditOrder({...order, condition: condition}))
    }
    const conditionText = determinateCondition(order.condition)

    return <div className={c.wrapper} /* onClick={() => navigate('/')} */>

        <div className={c.window}>
            <h2>Заказ создан {determinateDate(order.createdAt)}</h2>            

            <OrderUser userId={order.userId} phone={order.phoneNumber} />

            <StatusChange changeStatus={changeStatus} conditionText={conditionText} condition={order.condition} />

            {/* {order?.updatedAt &&
                <div>обновлено: {order.updatedAt}</div>} */}


            <div>
                сообщение клиенту
            </div>

            <div>
                заметка для мастера
            </div>

            <div>
                ответственный менеджер
            </div>

            <div>
                планируемая дата доставки
            </div>

            <div>
                заметка для курьера
            </div>
        </div>
    </div>

}