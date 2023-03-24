import { FC } from 'react';
import c from './SortArrow.module.scss';

interface ISortArrowProps {
    chosenTagId: number
}

export const SortArrow: FC<ISortArrowProps> = ({chosenTagId}:ISortArrowProps) => {

    let classname
    if (chosenTagId === 3 || chosenTagId === 4) {
        classname = c.upSortArrow
    }  else {
        classname = c.sortArrow
    }

    return <div className={classname} />
}