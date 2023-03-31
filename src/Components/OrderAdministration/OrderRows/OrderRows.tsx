import { FC } from "react";
import { ICartItemWithSum, IOrder } from "../../../types/types";
import { determinateCondition, determinateDate } from "./functions";
import { OrderRow } from "./OrderRow";

interface IOrderRowsProps {
    orders: IOrder[]
    setCurrentOrderId: (arg: string) => void
}

export const OrderRows: FC<IOrderRowsProps> = ({ orders, setCurrentOrderId }: IOrderRowsProps) => {

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
                    phone={order.phoneNumber}
                    orderId={order._id}
                    setCurrentOrderId={setCurrentOrderId} />
            })
        }
    </>
}