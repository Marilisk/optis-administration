import { FC } from 'react';
import { INavIcon } from './PlannerIcon';



export const MapIcon:FC<INavIcon> = ({ fill }:INavIcon) => {

    return <div >

        <svg xmlns="http://www.w3.org/2000/svg" fill={fill} id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="14" height="14">
            <path d="M21.867,1.612,17.515.155A2.956,2.956,0,0,0,15.724.12L8.538,2.092,4.155.233A3,3,0,0,0,0,3V21.754l7.982,2.281,8.021-2,8,1.948V4.483A3,3,0,0,0,21.867,1.612ZM15,2.384V20.219l-6,1.5V3.972ZM2,3A1,1,0,0,1,3.387,2.08L7,3.581V21.674L2,20.246Zm20,18.43-5-1.218V2.092l4.275,1.43A1,1,0,0,1,22,4.483Z" />
        </svg>

    </div>
}