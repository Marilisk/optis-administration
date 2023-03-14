import { FC } from "react";
import { ICartItemWithSum, IOrder } from "../../../types/types";
import { determinateCondition, determinateDate } from "./functions";
import { OrderRow } from "./OrderRow";

interface IOrderRowsProps {
    orders: IOrder[]
}

export const OrderRows: FC<IOrderRowsProps> = ({ orders }: IOrderRowsProps) => {

    return <>
        {
            orders.map(order => {
                const date = determinateDate(order.createdAt)
                const condition = determinateCondition(order.condition)
                const sum = order.cart.reduce((acc: number, elem: ICartItemWithSum) => acc + elem.price, 0)
                    .toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })

                return <OrderRow key={order._id}
                    date={date}
                    condition={condition}
                    sum={sum}
                    userId={order.userId}
                    phone={order.phoneNumber}
                    orderId={order._id} />
            })
        }
    </>
}