import { FC } from 'react';
import c from './CustomCheckbox.module.scss';

interface ICustomCheckbox {
    field: any
}
export const CustomCheckbox:FC<ICustomCheckbox> = ({ field }:ICustomCheckbox) => {
    
    return <div className={field.checked ? c.checked : c.checkWrap}>

        <input {...field} 
            id='rememberMe'
            type='checkbox' />
    </div>
}