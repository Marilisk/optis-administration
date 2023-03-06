import c from './AdminRequestForm.module.scss';
import { FC } from 'react';
import { Form, Formik } from 'formik';
import FieldLine from '../../EyewearAdministration/FieldLine/FieldLine.';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAdminRequest } from '../../../redux/authSlice';
import { LoadingDotsPreloader } from '../../assets/Preloader/LoadingDots/LoadingDotsPreloader';


export const AdminRequestForm: FC = () => {

    const dispatch = useAppDispatch()

    const role = useAppSelector(s => s.auth.loginData.data?.role)
    
    if(!role) {
        return <LoadingDotsPreloader />
    }

    return <div className={c.wrap}>

        <Formik initialValues={{ email: '', name: '' }}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
                console.log(values)
                const body = {
                    email: values.email,
                    fullName: values.name,
                    role,
                }
                dispatch(fetchAdminRequest(body))
                actions.resetForm()
            }}
        >
            {props => (
                <Form>
                    <FieldLine name='email' label='почта' />
                    <FieldLine name='name' label='имя и фамилия' />

                    <div className={c.btnWrap}>
                        <button type='submit'>
                            отправить запрос на предоставление доступа
                        </button>
                    </div>
                </Form>
            )}
        </Formik>



    </div>

}