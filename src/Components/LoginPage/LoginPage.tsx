import c from './LoginPage.module.scss';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectIsAuth } from '../../redux/authSlice';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';


export const LoginPage: FC = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const authLoading = useAppSelector(s => s.auth.loginData.status)
    const [isLoginTab, setIsLoginTab] = useState(true);

    let navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/manage');
        }
    })

    return <div className={c.wrap}>
        <div className={c.tabWrap}>
            <div className={isLoginTab ? c.activeTab : c.tab} onClick={() => setIsLoginTab(true)}>
                ВОЙТИ
            </div>
            <div className={isLoginTab ? c.tab : c.activeTab} onClick={() => setIsLoginTab(false)}>
                ЗАРЕГИСТРИРОВАТЬСЯ
            </div>
        </div>

        {isLoginTab ? <LoginForm isLoading={authLoading} /> :

            <RegisterForm navigate={navigate}
                isLoading={authLoading} />}

    </div>

}