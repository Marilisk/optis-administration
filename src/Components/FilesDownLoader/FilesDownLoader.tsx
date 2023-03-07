import React, { ChangeEvent, FC, useState, useEffect } from 'react';
import { setImagesAmount } from '../../redux/administrateSlice';
import instance from '../../redux/API/api';
import { IImageUrl } from '../../types/types';
import FilesDownLoadField from './FileDownLoadField/FilesDownLoadField';
import c from './FilesDownLoader.module.scss';

interface IFilesDownloaderProps {
    images: IImageUrl
    setImages: (arg: IImageUrl) => void
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    showDownloader: boolean
    dispatch: (arg: any) => void
}

const countPhotos = (images: any) => {
    //console.log('in countPhotos function')
    let number = 0;
    let keysArray = Object.keys(images)
    for (let el of keysArray) {
        if (images[el] !== '') {
            number += 1
        }
    }
    return number
}

const FilesDownloader: FC<IFilesDownloaderProps> = ({ images, setImages, setFieldValue, showDownloader, dispatch }: IFilesDownloaderProps) => {

    const [downloadStatus, setDownloadStatus] = useState({ main: null, side: null, perspective: null })

    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>, currentImg: string) => {
        try {
            const formData = new FormData();
            if (e.target.files) {
                const file = e.target.files[0];
                formData.append('image', file);
                setDownloadStatus({ ...downloadStatus, [currentImg]: 'pending' })
                const { data } = await instance.post('/upload', formData);
                const newI = { ...images, [currentImg]: data.url }
                setImages(newI);
                setDownloadStatus({ ...downloadStatus, [currentImg]: null })
                setFieldValue('imageUrl', { ...images, [currentImg]: data.url })
            }
        } catch (error) {
            console.warn(error);
            alert('не получилось загрузить фото')
            setDownloadStatus({ ...downloadStatus, [currentImg]: null })
        }
    }

    useEffect(() => {
        let amount = countPhotos(images)
        dispatch(setImagesAmount(amount))
    }, [dispatch, images])


    return <div className={showDownloader ? c.visibleWrap : c.hiddenWrap}>
        <div>

            <FilesDownLoadField handleChangeFile={handleChangeFile}
                image={images.main}
                name='main'
                downloadStatus={downloadStatus.main}
                label='главное фото' />

            <FilesDownLoadField handleChangeFile={handleChangeFile}
                image={images.side}
                name='side'
                downloadStatus={downloadStatus.side}
                label='фото сбоку' />

            <FilesDownLoadField handleChangeFile={handleChangeFile}
                image={images.perspective}
                name='perspective'
                downloadStatus={downloadStatus.perspective}
                label='фото в перспективе' />

        </div>
    </div>
}

export default React.memo(FilesDownloader)