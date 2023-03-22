import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import c from './GoodItem.module.scss';

interface IBtnsBlockProps {
    productId: string
}

export const BtnsBlock: FC<IBtnsBlockProps> = ({productId }: IBtnsBlockProps) => {

    const navigate = useNavigate()

    return <div className={c.btnsBlock}>
        <button type='button' onClick={() => navigate(`/manage/${productId}`)}>
            удалить
        </button>
        <button type='button'>
            изменить
        </button>
    </div>

}