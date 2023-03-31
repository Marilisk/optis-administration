import { FC } from "react";
import { determinateDate } from "../../OrderRows/functions";

interface IDeliveryDateProps {
    createdAt: Date
}

export const DeliveryDate: FC<IDeliveryDateProps> = ({ createdAt }: IDeliveryDateProps) => {

    const date = new Date(createdAt)
    const resDate = new Date(date.setDate(date.getDay() + 7))
       

    return <>
        расчётная дата доставки: {determinateDate(resDate)}
    </>
}