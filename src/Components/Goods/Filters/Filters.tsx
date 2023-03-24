import { FC, useState } from 'react';
import { selectFilter } from '../../../redux/featuresSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import c from './Filters.module.scss'


export const Filters: FC = () => {
    const filters = useAppSelector(s => s.filters.filters)
    const dispatch = useAppDispatch()

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