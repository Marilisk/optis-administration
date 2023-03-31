import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectFilter } from '../../../redux/ordersSlice'
import c from './../../Goods/Filters/Filters.module.scss'


export const OrderFilter: FC = () => {
    const dispatch = useAppDispatch()
    const filters = useAppSelector(s => s.orders.filters)

    const [isSelectFocused, setIsSelectFocused] = useState(false)

    return <div className={c.wrap}>
        
        <div className={isSelectFocused ? c.focusedSelect : c.fakeSelect}
            onClick={() => setIsSelectFocused(!isSelectFocused)}>
            <div>
                {filters.chosenOption.name}
                <div className={isSelectFocused ? c.upArrow : c.downArrow} />
            </div>
        </div>
        <div className={isSelectFocused ? c.accordeon : c.hiddenAccordeon}>
            {filters.options.map(el => (
                <div key={el.id}
                    onClick={() => {
                        dispatch(selectFilter(el))
                        setIsSelectFocused(false)
                    }}>
                    <span>{el.name}</span>
                </div>
            ))}
        </div>
    </div>
}