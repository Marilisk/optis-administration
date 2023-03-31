import { FC, useState, ChangeEvent } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { localEditOrder } from "../../../../redux/ordersSlice";
import { IOrder } from "../../../../types/types";
import c from './Manager.module.scss'

interface IManagerProps {
    order: IOrder
}

export const Manager: FC<IManagerProps> = ({ order }: IManagerProps) => {
    const dispatch = useAppDispatch()

    const [manager, setManager] = useState({
        name: order.manager || '',
        phone: ''
    })
    
    return <div className={c.wrap}>
        <label>
            <span>имя</span>
            <input type={'text'} value={manager.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setManager({ ...manager, name: e.currentTarget.value })
                    let currentOrder = { ...order, manager: e.currentTarget.value }
                    dispatch(localEditOrder(currentOrder))
                }} />
        </label>
        <label>
            телефон
            <input type={'text'} value={manager.phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setManager({ ...manager, phone: e.currentTarget.value })
                    let currentOrder = { ...order, manager: e.currentTarget.value }
                    dispatch(localEditOrder(currentOrder))
                }} />
        </label>
    </div>
}