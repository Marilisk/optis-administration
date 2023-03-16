import { FC, useEffect, useState } from "react";
import { getUser } from "../../../../redux/API/fetchers/getUser";
import { IUser } from "../../../../types/types";
import { LoadingDots } from "../../../assets/Preloader/LoadingDots/LoadingDots";
import c from './OrderUser.module.scss'

interface IOrderUserProps {
    userId: string
    phone: string
}

export const OrderUser: FC<IOrderUserProps> = ({ userId, phone }: IOrderUserProps) => {
    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        getUser(userId, setUser)
    }, [userId])


    if (!user) {
        return <div className={c.preloaderWrap}><LoadingDots /></div>
    }


    return <div className={c.wrapper}>
        <span>клиент</span>
        <div>
            {user.fullName}
        </div>
        
        <span>контакты:</span>
        <div>
            <p>{phone}</p>
            <p>почта {user.email}, {user.isActivated ? 'подтверждена' : 'не подтверждена'}</p>
        </div>
        <div>
            
        </div>
    </div>
}