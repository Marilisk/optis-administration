import { ChangeEvent, FC, useState } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { localEditOrder } from "../../../../redux/ordersSlice";
import { IOrder } from "../../../../types/types";
import c from './ManagerNote.module.scss'

interface INoteProps {
    order: IOrder
}

export const Note: FC<INoteProps> = ({ order }: INoteProps) => {
    const dispatch = useAppDispatch()

    const [text, setText] = useState(order.additionalInfo)

    return <div className={c.wrap}>
        <textarea value={text} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setText(e.currentTarget.value)
            let currentOrder = { ...order, additionalInfo: e.currentTarget.value }
            dispatch(localEditOrder(currentOrder))
        }}
        />
    </div>
}