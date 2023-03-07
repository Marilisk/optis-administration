import { Link } from 'react-router-dom';
import { useState } from 'react';
import { fetchLogout } from '../../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { LogoutIcon } from '../assets/navigation_icons/LogoutIcon';
import { AvatarEditor } from './AvatarEditor/AvatarEditor';
import c from './Header.module.scss';
import { NameEditor } from './NameEditor/NameEditor';
import { LoadingDotsPreloader } from '../assets/Preloader/LoadingDots/LoadingDotsPreloader';


export const Header = () => {
    const name = useAppSelector(s => s.auth.loginData.data?.fullName)
    const avatarUrl = useAppSelector(s => s.auth.loginData.data?.avatarUrl)
    const dispatch = useAppDispatch()

    const [editWindowShown, setEditWindowShown] = useState('')

    if (!name) {
        return <LoadingDotsPreloader />
    }

    return <div className={c.wrap} onMouseLeave={() => setEditWindowShown('')}>
        <div>
            <Link to='/'>
                <h1 className={c.h1}>
                    MONSTER <span>SYSTEMS</span>
                </h1>
            </Link>
        </div>

        <div className={c.name}>

            <AvatarEditor avatarUrl={avatarUrl} editWindowShown={editWindowShown} setEditWindowShown={setEditWindowShown} />

            <NameEditor name={name} editWindowShown={editWindowShown} setEditWindowShown={setEditWindowShown} />

            <div className={c.iconWrapper} onClick={() => dispatch(fetchLogout())}>
                
                <div>
                    <LogoutIcon fill={'#475B73'} />
                </div>
            </div>
        </div>

    </div>

}