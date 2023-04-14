import { FC } from 'react';
import c from './Navigation.module.scss';
import { BarCodeIcon } from '../assets/navigation_icons/BarCodeIcon';
import { NavLink } from 'react-router-dom';
import { CartIcon } from '../assets/navigation_icons/CartIcon';
import { OrderIcon } from '../assets/navigation_icons/OrderIcon';
import { AdminIcon } from '../assets/navigation_icons/AdminIcon';


export const Navigation: FC = () => {

    return <div className={c.wrapper}>

        <div className={c.btnsHeader}>
            <CartIcon fill={'#475B73'} />
            <span>Каталог</span>
        </div>

        <NavLink to={'/'} className={({ isActive }) =>
            isActive ? c.activeItem : c.item}>
            <span>Оправы</span>
        </NavLink>

        <NavLink to={'/photo'} className={({ isActive }) =>
            isActive ? c.activeItem : c.item}>
            <span>Фото</span>
        </NavLink>

        <div className={c.btnsHeader}>
            <BarCodeIcon fill={'#475B73'} />
            <span>Добавить товар</span>
        </div>

        <NavLink to={'/manage'} className={({ isActive }) =>
            isActive ? c.activeItem : c.item}>
            <span>Оправа</span>
        </NavLink>

        <NavLink to={'/managelenses'} className={({ isActive }) =>
            isActive ? c.activeItem : c.item}>
            <span>Линзы</span>
        </NavLink>

        <div className={c.btnsHeader}>
            <OrderIcon fill={'#475B73'} />
            <span>Заказы</span>
        </div>

        <NavLink to={'/orders/processed'} className={({ isActive }) =>
            isActive ? c.activeItem : c.item}>
            <span>В обработке</span>
        </NavLink>

        <NavLink to={'/orders/done'} className={({ isActive }) =>
            isActive ? c.activeItem : c.item}>
            <span>Завершённые</span>
        </NavLink>

        {/* <div className={c.btnsHeader}>
            <ClientsIcon fill={'#475B73'} />
            <span>Клиенты</span>
        </div> */}

        {/* <NavLink to={'/goods/lenses'} className={({ isActive }) =>
            isActive ? c.activeItem : c.item}>
            <span>Линзы</span>
        </NavLink> */}

        <div className={c.btnsHeader}>
            <AdminIcon fill={'#475B73'} />
            <span>Системное</span>
        </div>
        <NavLink to={'/noadminerror'} className={({ isActive }) =>
            isActive ? c.activeItem : c.item}>
            <span>Доступ</span>
        </NavLink>

    </div>
}