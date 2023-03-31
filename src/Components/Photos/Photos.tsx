import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPhotos } from '../../redux/photosSlice';
import { IFileFromList, LoadingStatusEnum } from '../../types/types';
import { LoadingDotsPreloader } from '../assets/Preloader/LoadingDots/LoadingDotsPreloader';
import { PhotoItem } from './PhotoItem/PhotoItem';
import c from './Photos.module.scss';


export const Photos = () => {
    const dispatch = useAppDispatch()
    const loading = useAppSelector(s => s.photos.imgs.status === LoadingStatusEnum.loading)

    const imgsArray = useAppSelector<IFileFromList[]>(s => s.photos.imgs.items)

    useEffect(() => {
        dispatch(fetchPhotos())
    }, [dispatch])

    if (imgsArray.length < 0) {
        return <LoadingDotsPreloader />
    }


    return <>
        <div className={c.container}>
            <h3>Фотографии всех товаров</h3>
            <div className={c.grid}>

                {imgsArray.map((el, i) => (
                    <div key={i}>
                        <div>
                            <PhotoItem photo={el} loading={loading} />
                        </div>
                    </div>
                ))}

            </div>
        </div>
    </>

}