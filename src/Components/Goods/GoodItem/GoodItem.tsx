import { FC, useState } from 'react';
import { API_URL, CLIENT_URL } from '../../../redux/API/api';
import { IImageUrl } from '../../../types/types';
import { ThreeDotsIcon } from '../../assets/ThreeDotsIcon';
import { BtnsBlock } from './BtnsBlock/BtnsBlock';
import c from './GoodItem.module.scss';

interface IGoodItemProps {
    imageUrl: IImageUrl
    loading: boolean
    name: string
    productId: string
    price: string
    quantity: number | undefined
}

export const GoodItem: FC<IGoodItemProps> = ({ imageUrl, loading, name, productId, price, quantity }: IGoodItemProps) => {
    
    const [areShowBtnsVisible, setShowBtnsVisible] = useState(false)

    return <div className={c.line} >

        <div className={c.flexContainer}>
            <a target={"_blank"} rel="noreferrer" href={`${CLIENT_URL}/product/${productId}`}>
                <div className={c.nameWrapper}>
                    {imageUrl ?
                        <img src={`${API_URL}${imageUrl.main}`} alt='' />
                        :
                        <div className={c.error}>нет фото</div>}
                    <div>{name}</div>
                </div>
                </a>

                <div className={c.priceWrapper}>
                    {price}
                </div>

                <div  className={c.quantityWrapper}>
                    {quantity}
                </div>

            <div className={c.dotsWrap}
                onClick={() => setShowBtnsVisible(!areShowBtnsVisible)}>
                
                {areShowBtnsVisible ?
                    <BtnsBlock productId={productId} loading={loading} /> :
                    <ThreeDotsIcon />
                }
            </div>

        </div>

    </div >

}