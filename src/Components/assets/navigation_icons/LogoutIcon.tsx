import { FC } from 'react';
import { IIconProps } from './BarCodeIcon';


export const LogoutIcon: FC<IIconProps> = ({ fill }: IIconProps) => {

    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill={fill} id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="14" height="14">
            <path d="M22.763,10.232l-4.95-4.95L16.4,6.7,20.7,11H6.617v2H20.7l-4.3,4.3,1.414,1.414,4.95-4.95a2.5,2.5,0,0,0,0-3.536Z" /><path d="M10.476,21a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H9.476a1,1,0,0,1,1,1V8.333h2V3a3,3,0,0,0-3-3H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H9.476a3,3,0,0,0,3-3V15.667h-2Z" />
        </svg>
    </div>
}