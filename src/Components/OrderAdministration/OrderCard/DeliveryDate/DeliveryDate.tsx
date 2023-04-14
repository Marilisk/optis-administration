import { FC } from "react";
import { determinateDate } from "../../OrderRows/functions";
import c from './DeliveryDate.module.scss'

interface IDeliveryDateProps {
    createdAt: Date
    address: string
}

export const DeliveryDate: FC<IDeliveryDateProps> = ({ createdAt, address }: IDeliveryDateProps) => {

    const date = new Date(createdAt)
    const resDate = new Date(date.setDate(date.getDay() + 7))

    return <div className={c.delivery}>
        <div>адрес: {address}</div>
        <div>расчётная дата доставки: {determinateDate(resDate)}</div>
    </div>
}