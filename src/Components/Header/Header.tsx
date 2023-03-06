import { Link } from 'react-router-dom';
import { useState } from 'react';
import { fetchLogout } from '../../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { LogoutIcon } from '../assets/navigation_icons/LogoutIcon';
import { AvatarEditor } from './AvatarEditor/AvatarEditor';
import c from './Header.module.scss';
import { NameEditor } from './NameEditor/NameEditor';


export const Header = () => {
    const name = useAppSelector(s => s.auth.loginData.data?.fullName)
    const avatarUrl = useAppSelector(s => s.auth.loginData.data?.avatarUrl)
    const dispatch = useAppDispatch()

    const [isAvatarHovered, setAvatarIsHovered] = useState(false)

    return <div className={c.wrap} /* onMouseLeave={() => setAvatarIsHovered(false)} */>
        <div>
            <Link to='/'>
                <h1 className={c.h1}>
                    MONSTER <span>SYSTEMS</span>
                </h1>
            </Link>
        </div>
        {name &&
            <div className={c.name}>

                <AvatarEditor avatarUrl={avatarUrl} isAvatarHovered={isAvatarHovered} setAvatarIsHovered={setAvatarIsHovered} />
                
                <NameEditor name={name} />

                <div className={c.iconWrapper} onClick={() => dispatch(fetchLogout())}>
                    <span>выйти</span>
                    <div>
                        <LogoutIcon fill={'#475B73'} />
                    </div>
                </div>
            </div>
        }

    </div>

}