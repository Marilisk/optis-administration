import { FC } from 'react';
import c from './Preloader.module.scss';


interface IPreloader {
    minFormat: boolean
}
export const Preloader:FC<IPreloader> = ({minFormat}:IPreloader) => {

    return <div className={minFormat ? c.miniWrap : c.wrap} >
        <div/>
    </div>
}