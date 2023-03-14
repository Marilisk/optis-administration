import { FC, useEffect, useState } from "react";
import instance from "../../../../redux/API/api";
import { IUser } from "../../../../types/types";
import { LoadingDots } from "../../../assets/Preloader/LoadingDots/LoadingDots";
import c from './OrderUser.module.scss'

interface IOrderUserProps {
    userId: string
    phone: string
}


export async function getUser(userId: string, setUser: (arg: IUser) => void) {
    const response = await instance.get(`/user/${userId}`)
    console.log(response)
    if (response.data) {
        setUser(response.data)
    }
}
export const OrderUser: FC<IOrderUserProps> = ({ userId, phone }: IOrderUserProps) => {
    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        getUser(userId, setUser)
    }, [userId])


    if (!user) {
        return <div className={c.preloaderWrap}><LoadingDots /></div>
    }


    return <div>
        <div>
            {user.fullName}
        </div>
        <div>
            {phone}
        </div>
    </div>
}