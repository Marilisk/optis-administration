import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { fetchDeleteProd, showAlarmWindow } from '../../../../redux/productsSlice';
import c from './BtnsBlock.module.scss';
import { useNavigate } from 'react-router-dom';

interface IBtnsBlockProps {
    productId: string
    loading: boolean
}

export const BtnsBlock: FC<IBtnsBlockProps> = ({ productId, loading }: IBtnsBlockProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const confirm = useAppSelector(s => s.products.alarmWindow.confirmed)


    const deleteProduct = () => {
        dispatch(showAlarmWindow({ isShown: true, text: 'Вы уверены, что хотите удалить товар?' }))
        if (confirm) {
            dispatch(fetchDeleteProd(productId))
        }
    }
    return <div className={c.btnsBlock}>

        <button type='button' disabled={loading}
            onClick={deleteProduct} >
            удалить
        </button>

        <button type='button' disabled={loading} onClick={() => navigate(`/manage/${productId}`)} >
            изменить 
        </button>

    </div>

}