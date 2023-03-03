import { FC } from 'react';
import { API_URL, CLIENT_URL } from '../../../redux/API/api';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchDeletePhoto, fetchImgOwner } from '../../../redux/photosSlice';
import { IFileFromList } from '../../../types/types';
import c from './PhotoItem.module.scss';

interface IPhotoItem {
    photo: IFileFromList
    loading: boolean
}
export const PhotoItem: FC<IPhotoItem> = ({ photo, loading }: IPhotoItem) => {
    const dispatch = useAppDispatch()

    return <div className={c.line}>
        <div className={c.flexContainer}>
            <img src={`${API_URL}/uploads/${photo.name}`} alt='' />
            <p>{photo.name}</p>

            {photo.owner ?
                <div className={c.ok}>
                    <a target={"_blank"} rel="noreferrer"
                        href={`${CLIENT_URL}
                            /${photo.owner[0].category === "eyewear" ? `product` : `lenses`}
                            /${photo.owner[0]._id}`} >
                        <span>есть такой товар, артикул </span>
                        {photo.owner[0].code}
                    </a>

                </div>
                :
                <div className={c.error}>
                    {photo.owner === null
                        &&
                        <div>
                            <p>ФОТО НЕ ПРИКРЕПЛЕНО!!!</p>
                            <button disabled={loading}
                                className={c.delBtn}
                                type='button'
                                onClick={() => dispatch(fetchDeletePhoto(photo.name))}>
                                удалить
                            </button>
                        </div>
                    }
                </div>
            }
            <button disabled={loading} className={c.showBtn}
                type='button' onClick={() => dispatch(fetchImgOwner(photo.name))}>
                показать товар
            </button>
        </div>
    </div >

}