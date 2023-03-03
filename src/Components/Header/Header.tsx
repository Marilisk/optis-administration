import { Link } from 'react-router-dom';
import { fetchLogout } from '../../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { LogoutIcon } from '../assets/navigation_icons/LogoutIcon';
import c from './Header.module.scss';


export const Header = () => {
    const name = useAppSelector(s => s.auth.loginData.data?.fullName)
    const dispatch = useAppDispatch()

    return <div className={c.wrap}>
        <div>
            <Link to='/'>
                <h1 className={c.h1}>
                    MONSTER <span>SYSTEMS</span>
                </h1>
            </Link>
        </div>
        {name &&
            <div className={c.name}>
                <div>
                    Вы зашли как {name}
                </div>
                <div className={c.iconWrapper} onClick={() => dispatch(fetchLogout()) }>
                    <span>выйти</span>
                    <div>
                        <LogoutIcon fill={'#475B73'} />
                    </div>
                </div>
            </div>
        }

    </div>

}