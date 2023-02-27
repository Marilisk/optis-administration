import React, { FC } from 'react';
import c from './Navigation.module.scss';
import { PlannerIcon } from '../assets/navigation_icons/PlannerIcon';
import { BarCodeIcon } from '../assets/navigation_icons/BarCodeIcon';
import { MapIcon } from '../assets/navigation_icons/MapIcon';
import { NavLink } from 'react-router-dom';


export const Navigation: FC = () => {

    return <div className={c.wrapper}>

        <NavLink to={'/orders'} className={({ isActive }) =>
            isActive ? c.activeItem : c.item}>
            <div className={c.iconWrapper}>
                <PlannerIcon fill={'#2953A4'} />
            </div>
            <span>Планировщик</span>
        </NavLink>


        <NavLink to={'/manage'} className={({ isActive }) =>
            isActive ? c.activeItem : c.item}>
            <div className={c.iconWrapper} id='clients'>
                <BarCodeIcon fill={'#2953A4'} />
            </div>
            <span>Добавить оправу</span>
        </NavLink>

        <NavLink to={'/managelenses'} className={({ isActive }) =>
            isActive ? c.activeItem : c.item}>
            <div className={c.iconWrapper} id='map'>
                <MapIcon fill={'#2953A4'} />
            </div>
            <span>Добавить линзы</span>
        </NavLink>

    </div>

}