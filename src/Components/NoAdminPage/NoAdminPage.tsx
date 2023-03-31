import c from './NoAdminPage.module.scss';
import { FC } from 'react';
import { AdminRequestForm } from './AdminRequestForm/AdminRequestForm';
import { useAppSelector } from '../../redux/hooks';


export const NoAdminPage: FC = () => {

    const adminReqServerMessage = useAppSelector(s => s.auth.loginData.adminReqServerMessage)

    return <div className={c.wrap}>

        <div className={c.container}>

            {adminReqServerMessage &&
                <div>{adminReqServerMessage}</div>}

            <div>
                <h2>Для просмотра большей части контента и его редактирования нужны полномочия</h2>
                <span>Обратитесь к администратору для получения прав доступа:</span>
            </div>
            <AdminRequestForm />

        </div>
    </div>

}