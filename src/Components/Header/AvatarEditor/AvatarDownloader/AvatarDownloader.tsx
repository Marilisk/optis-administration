import c from './style.module.scss';
import { FC, useState, ChangeEvent } from 'react';
import instance, { API_URL } from '../../../../redux/API/api';
import { useAppDispatch } from '../../../../redux/hooks';
import { LoadingDots } from '../../../assets/Preloader/LoadingDots/LoadingDots';
import { fetchEditAvatar } from '../../../../redux/authSlice';

interface IAvatarDownloaderProps {
    avatarUrl: string | undefined
}

export const AvatarDownloader: FC<IAvatarDownloaderProps> = ({ avatarUrl }: IAvatarDownloaderProps) => {
    const dispatch = useAppDispatch()

    const [downloadStatus, setDownloadStatus] = useState(false)
    const [newAvatar, setNewAvatar] = useState(avatarUrl)

    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData();
            if (e.target.files) {
                const file = e.target.files[0];
                formData.append('image', file);
                setDownloadStatus(true)
                const { data } = await instance.post('/upload', formData);
                console.log(data)
                if (data.url) {
                    setNewAvatar(data.url)
                    dispatch(fetchEditAvatar(data.url))
                }
                setDownloadStatus(false)
            }
        } catch (error) {
            console.warn(error);
            alert('не получилось загрузить фото')
            setDownloadStatus(false)
        }
    }

    return <div >

        <input type='file' onChange={(e) => handleChangeFile(e)} />

        {
            newAvatar &&
            <div className={c.imgWrapper}>
                <img src={`${API_URL}${newAvatar}`} alt='newAvatar' />
            </div>
        }

        {
            downloadStatus &&
            <LoadingDots />
        }


    </div>
}