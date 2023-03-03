import { FC } from 'react';
import { IIconProps } from './BarCodeIcon';


export const CartIcon: FC<IIconProps> = ({ fill }: IIconProps) => {

    return <div >
        <svg xmlns="http://www.w3.org/2000/svg" fill={fill} id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="14" height="14">
            <path d="M3.69,7H0v-2H3.45l.24,2ZM0,13v2H4.63l-.24-2H0Zm3.92-4H0v2H4.16l-.24-2Zm17.67,6H8.65l.13,1.12c.06,.5,.49,.88,.99,.88h11.22v2H9.78c-1.52,0-2.8-1.14-2.98-2.65L5.21,2.88c-.06-.5-.49-.88-.99-.88H2V0h2.22c1.52,0,2.8,1.14,2.98,2.65l.04,.35H23.99l-2.4,12Zm-.04-10H7.48l.94,8h11.53l1.6-8Zm-12.55,15c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2Zm9,0c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2Z" />
        </svg>
    </div>
}