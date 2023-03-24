import { AngleDown } from "../../assets/navigation_icons/AngleDown";
import { FC } from "react";
import c from './../Orders.module.scss'
import { useNavigate } from "react-router-dom";


interface IOrderRowProps {
    date: string
    condition: string
    sum: string
    userId: string
    phone: string
    orderId: string
}
export const OrderRow: FC<IOrderRowProps> = ({ date, condition, sum, userId, phone, orderId }: IOrderRowProps) => {

    const navigate = useNavigate()

    return <tr onClick={() => navigate(`/order/${orderId}`)}>
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