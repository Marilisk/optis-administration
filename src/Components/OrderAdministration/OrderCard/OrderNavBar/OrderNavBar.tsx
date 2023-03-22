import { FC } from "react";
import { CourierNote } from "../../../assets/order_icons/CourierNote";
import { DeliveryIcon } from "../../../assets/order_icons/DeliveryIcon";
import { ManagerIcon } from "../../../assets/order_icons/ManagerIcon";
import { NoteIcon } from "../../../assets/order_icons/NoteIcon";
import { StatusIcon } from "../../../assets/order_icons/StatusIcon";
import { UpdateIcon } from "../../../assets/order_icons/UpdateIcon";
import { UserIcon } from "../../../assets/order_icons/UserIcon";
import { OrderTabType } from "../OrderCard";
import c from './OrderNavBar.module.scss'

interface IOrderNavBarProps {
    activeTab: OrderTabType
    setActiveTab: (arg: OrderTabType) => void
}

export const OrderNavBar: FC<IOrderNavBarProps> = ({activeTab, setActiveTab}:IOrderNavBarProps) => {
    
    return <div className={c.navBar}>

                <div className={activeTab === 'user' ? c.activeTab : c.tab} onClick={() => setActiveTab('user')} >
                    <UserIcon  />
                    клиент
                </div>

                <div className={activeTab === 'status' ? c.activeTab : c.tab} onClick={() => setActiveTab('status')}>
                    <StatusIcon />
                    статус
                </div>

                <div className={activeTab === 'updateDate' ? c.activeTab : c.tab} onClick={() => setActiveTab('updateDate')}>
                    <UpdateIcon />
                    обновлён
                </div>

                <div className={activeTab === 'notes' ? c.activeTab : c.tab} onClick={() => setActiveTab('notes')}>
                    <NoteIcon />
                    примечания
                </div>

                <div className={activeTab === 'responsibleManager' ? c.activeTab : c.tab} onClick={() => setActiveTab('responsibleManager')}>
                    <ManagerIcon />
                    менеджер
                </div>

                <div className={activeTab === 'deliveryDate' ? c.activeTab : c.tab} onClick={() => setActiveTab('deliveryDate')}>
                    <DeliveryIcon />
                    доставка
                </div>

                <div className={activeTab === 'courierNote' ? c.activeTab : c.tab} onClick={() => setActiveTab('courierNote')}>
                    <CourierNote />
                    курьеру
                </div>

            </div>

}