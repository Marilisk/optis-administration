import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProducts } from '../../redux/productsSlice';
import { LoadingStatusEnum } from '../../types/types';
import { LoadingDotsPreloader } from '../assets/Preloader/LoadingDots/LoadingDotsPreloader';
import { GoodItem } from './GoodItem/GoodItem';
import c from './Eyewears.module.scss';
import { priceFormatter } from '../assets/functions/priceFormatter';
import { CatalogHead } from './CatalogHead/CatalogHead';
import { useSortEyeWear } from '../assets/functions/useSortProducts';
import { Filters } from './Filters/Filters';
import { useFilterEyeWear } from '../assets/functions/useFilterProducts';


export const Eyewears = () => {
    const dispatch = useAppDispatch()
    const loading = useAppSelector(s => s.products.products.status === LoadingStatusEnum.loading)
    const goodsArr = useAppSelector(s => s.products.products.items)
    const filteredGoods = useFilterEyeWear(goodsArr)
    const sortedGoods = useSortEyeWear(filteredGoods)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if (!goodsArr || loading) {
        return <LoadingDotsPreloader />
    }

    return <div className={c.wrap}>

        <div className={c.container}>
            <div className={c.header}>
                <h3>Оправы</h3>
                <Filters  />
            </div>

            <CatalogHead />

            {sortedGoods.map((el, i) => {
                const price = priceFormatter(el.price)
                return <div key={i}>
                    <GoodItem name={el.name}
                        productId={el._id}
                        imageUrl={el.imageUrl}
                        loading={loading}
                        price={price}
                        quantity={el.inStockQuantity} />
                </div>
            })}
        </div>

    </div>

}