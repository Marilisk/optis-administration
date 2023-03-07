import React, { ChangeEvent, FC } from 'react';
import { API_URL } from '../../../redux/API/api';
import { LoadingDots } from '../../assets/Preloader/LoadingDots/LoadingDots';
import c from './../FilesDownLoader.module.scss';

interface IFilesDownloadFieldProps {
    image: string | undefined
    name: string
    downloadStatus: string | null
    handleChangeFile: (arg1: ChangeEvent<HTMLInputElement>, arg2: string) => void
    label: string
}

const FilesDownloadField: FC<IFilesDownloadFieldProps> = ({ image, name, downloadStatus, handleChangeFile, label }: IFilesDownloadFieldProps) => {


    return <div className={c.line}>

        <label>
            <span>{label}</span>
            <input type='file' id='imageUrl' name='imageUrl'
                onChange={(e) => handleChangeFile(e, name)} />
        </label>

        {image && <div className={c.imgWrapper}>
            <img src={`${API_URL}${image}`} alt='' />
        </div>}

        {downloadStatus ? <LoadingDots /> : null}

    </div>

}

export default React.memo(FilesDownloadField)