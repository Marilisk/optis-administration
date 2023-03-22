import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, CLIENT_URL } from '../../../redux/API/api';
import { useAppDispatch } from '../../../redux/hooks';
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
    const dispatch = useAppDispatch()
    const [isHovered, setIsHovered] = useState(false)
    const [areShowBtnsVisible, setShowBtnsVisible] = useState(true)
    const navigate = useNavigate()

    return <div className={c.line}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} >

        <a target={"_blank"} rel="noreferrer" href={`${CLIENT_URL}/product/${productId}`}>

            <div className={c.flexContainer}>

                <div className={c.nameWrapper}>
                    {imageUrl ?
                        <img src={`${API_URL}${imageUrl.main}`} alt='' />
                        :
                        <div className={c.error}>нет фото</div>}
                    <div>{name}</div>
                </div>

                <div>
                    {quantity}
                </div>

                <div className={c.priceWrapper}>
                    {price}
                </div>

                <div>
                    {quantity}
                </div>

                {/* {isHovered && 
                <button type='button'>
                    удалить
                </button>} */}

                <div className={c.dotsWrap}
                    onClick={() => setShowBtnsVisible(!areShowBtnsVisible)}>
                    <ThreeDotsIcon />
                    {areShowBtnsVisible &&
                        <BtnsBlock productId={productId} />
                    }
                </div>

            </div>

        </a>
    </div >

}