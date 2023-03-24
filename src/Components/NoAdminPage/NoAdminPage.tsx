import c from './NoAdminPage.module.scss';
import { FC, useEffect } from 'react';
import { AdminRequestForm } from './AdminRequestForm/AdminRequestForm';
import { useAppSelector } from '../../redux/hooks';
import { selectIsManager } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';


export const NoAdminPage: FC = () => {

    const isManager = useAppSelector(selectIsManager)
    const serverMessage = useAppSelector(s => s.auth.loginData.serverMessage)
    const navigate = useNavigate()

    useEffect(() => {
        if (isManager) {
            navigate('/')
        }
    }, [isManager, navigate])


    return <div className={c.wrap}>

        <div className={c.container}>

            {serverMessage ?
                <div>{serverMessage}</div>
                :
                <>
                    <div>
                        Обратитесь к администратору для получения прав доступа:
                    </div>
                    <AdminRequestForm />
                </>

            }
        </div>
    </div>

}