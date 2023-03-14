import { ChangeEvent, FC } from 'react';
import { API_URL } from '../../../../redux/API/api';
import { LoadingDots } from '../../../assets/Preloader/LoadingDots/LoadingDots';
import c from './../FilesDownLoader.module.scss';

interface ILenDownloaderFieldProps {
    handleChangeFile: (arg1: ChangeEvent<HTMLInputElement>, arg2: string) => void
    currentImg: string | undefined
    name: string
    downloadStatus: 'pending' | null
    title: string
}

export const LenDownloaderField: FC<ILenDownloaderFieldProps> =
    ({ handleChangeFile, currentImg, downloadStatus, title, name }: ILenDownloaderFieldProps) => {


        return <div>
            
            <label>
                <span>{title}</span>
                <input type='file' id='imageUrl' name='imageUrl'
                    onChange={(e) => handleChangeFile(e, name)} />
            </label>

            {currentImg && <div className={c.imgWrapper}>
                <img src={`${API_URL}${currentImg}`} alt='' />
            </div>}

            {downloadStatus ?
                <div className={c.preloaderContainer}>
                    <LoadingDots />
                </div>
                : null
            }

        </div>

    } 