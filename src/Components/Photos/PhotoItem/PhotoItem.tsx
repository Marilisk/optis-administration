import { FC, useState } from 'react';
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
    const [isHovered, setIsHovered] = useState(false)

    return <div className={c.line} 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} >
        <div className={c.flexContainer}>

            <img src={`${API_URL}/uploads/${photo.name}`} alt='' />

            <button disabled={loading} 
                className={isHovered ? c.showBtn : c.hiddenBtn}
                type='button' onClick={() => dispatch(fetchImgOwner(photo.name))}>
                показать товар
            </button>

            {photo.owner ?
                <div className={c.ok}>
                    <a target={"_blank"} rel="noreferrer"
                        href={`${CLIENT_URL}/${photo.owner[0].category === "eyewear" ? `product` : `lenses`}/${photo.owner[0]._id}`} >
                        <span>артикул </span>
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

        </div>
    </div >

}