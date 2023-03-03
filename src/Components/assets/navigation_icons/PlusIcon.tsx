import { FC } from 'react';
import { IIconProps } from './BarCodeIcon';


export const PlusIcon: FC<IIconProps> = ({ fill }: IIconProps) => {

    return <div >
        <svg xmlns="http://www.w3.org/2000/svg" fill={fill} id="Layer_1" data-name="Layer 1" /* viewBox="0 0 30 30" */ width="30" height="30">
        <path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z"/>
        </svg>
    </div>
}