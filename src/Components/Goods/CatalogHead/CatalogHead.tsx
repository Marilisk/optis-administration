import { FC } from 'react';
import { setSortTag } from '../../../redux/featuresSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { SortArrow } from '../../assets/SortArrow/SortArrow';
import c from './CatalogHead.module.scss';


export const CatalogHead: FC = () => {

    const dispatch = useAppDispatch()
    const chosenTagId = useAppSelector(s => s.filters.sortTags.chosenTagId)

    const setSort = (sortId: number) => {
        console.log('chosenTagId', chosenTagId)
        dispatch(setSortTag(sortId))
    }

    return <div className={c.line} >

        <div className={c.flexContainer}>
            <div className={c.nameWrapper}>
                <div>наименование</div>
            </div>

            <div className={c.priceWrapper}
                onClick={() => chosenTagId === 2 ? setSort(3) : setSort(2)}>
                цена
                {(chosenTagId === 2 || chosenTagId === 3)
                    &&
                    <SortArrow chosenTagId={chosenTagId} />}
            </div>

            <div onClick={() => chosenTagId === 4 ? setSort(5) : setSort(4)}>
                в наличии
                {(chosenTagId === 4 || chosenTagId === 5)
                    && <SortArrow chosenTagId={chosenTagId} />}
            </div>

            <div />
            {/* </div> */}

        </div>

    </div >

}