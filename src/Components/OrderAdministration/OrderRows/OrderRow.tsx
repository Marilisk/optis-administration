import { AngleDown } from "../../assets/navigation_icons/AngleDown";
import { FC } from "react";
import c from './../Orders.module.scss'

interface IOrderRowProps {
    date: string
    condition: string
    sum: string
    phone: string
    orderId: string
    setCurrentOrderId: (arg: string) => void
}
export const OrderRow: FC<IOrderRowProps> = ({ date, condition, sum, phone, orderId, setCurrentOrderId }: IOrderRowProps) => {


    return <tr onClick={() => setCurrentOrderId(orderId)}>
        <td>{condition}</td>
        <td>{date}</td>

        <td>{phone} </td>
        <td>{sum}</td>
        <td>
            <div className={c.iconWrapper}>
                <AngleDown fill='#121212' /> 
            </div>
        </td>
    </tr>
}