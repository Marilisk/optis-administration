import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProducts } from '../../redux/productsSlice';
import { LoadingStatusEnum } from '../../types/types';
import { LoadingDotsPreloader } from '../assets/Preloader/LoadingDots/LoadingDotsPreloader';
import { GoodItem } from './GoodItem/GoodItem';
import c from './Eyewears.module.scss';
import { priceFormatter } from '../assets/functions/priceFormatter';


export const Eyewears = () => {
    const dispatch = useAppDispatch()
    const loading = useAppSelector(s => s.products.products.status === LoadingStatusEnum.loading)

    const goodsArr = useAppSelector(s => s.products.products.items)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if (goodsArr.length < 0) {
        return <LoadingDotsPreloader />
    }

    const goods = goodsArr.map((el, i) => {

        console.log(el.imageUrl)
        const price = priceFormatter(el.price) 

        return <div key={i}>
            <GoodItem name={el.name} 
            productId={el._id} 
            imageUrl={el.imageUrl} 
            loading={loading}
            price={price}
            quantity={el.inStockQuantity} />
        </div>
    })

    return <div className={c.wrap}>

        <div className={c.container}>
            <h3>Оправы</h3>
            {goods}
        </div>

    </div>

}