import { ChangeEvent, FC, useState } from 'react';
import instance from '../../../redux/API/api';
import { IImageUrl } from '../../../types/types';
import { LenDownloaderField } from './DowmloaderField/LenDownloaderField';
import c from './FilesDownLoader.module.scss';

interface IFilesDownloaderProps {
    images: IImageUrl
    setImages: (arg: IImageUrl) => void
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const LenFilesDownloader: FC<IFilesDownloaderProps> = ({ images, setImages, /* editMode, currentProduct, */ setFieldValue }: IFilesDownloaderProps) => {

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


    return <div className={c.downloader}>

        <LenDownloaderField handleChangeFile={handleChangeFile}
            title='главное фото *'
            downloadStatus={downloadStatus.main}
            currentImg={images.main}
            name='main' />

        <LenDownloaderField handleChangeFile={handleChangeFile}
            title='фото сбоку'
            downloadStatus={downloadStatus.side}
            currentImg={images.side}
            name='side' />

        <LenDownloaderField handleChangeFile={handleChangeFile}
            title='фото в перспективе'
            downloadStatus={downloadStatus.perspective}
            currentImg={images.perspective}
            name='perspective' />

    </div>
} 