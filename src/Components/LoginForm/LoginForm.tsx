import c from './LoginForm.module.scss';
import { Field, Form, Formik } from 'formik';
import { validateEmail, validatePassword } from './loginValidate';
import { FC } from 'react';
import { LoadingStatusEnum } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAuth } from '../../redux/authSlice';
import { CustomCheckbox } from '../assets/CustomCheckbox/CustomCheckbox';


interface ILoginForm {
    isLoading: LoadingStatusEnum
}

export const LoginForm: FC<ILoginForm> = ({ isLoading }: ILoginForm) => {
    const dispatch = useAppDispatch()
    const serverMsg = useAppSelector(s => s.auth.loginData.serverMessage)

    const emailInLS = localStorage.getItem('email')
    const initialValues = emailInLS ? { email: emailInLS, password: '', rememberMe: true }
        : { email: '', password: '', rememberMe: true, }

    return <Formik initialValues={initialValues}
        onSubmit={async (values, actions) => {
            const payload = { email: values.email, password: values.password };
            await dispatch(fetchAuth(payload));
        }}
    >

        {({ errors, touched }) => (
            <Form>
                <div className={c.wrap}>

                    <Field id='email' name='email' placeholder='email' validate={validateEmail}
                        style={errors.email && { borderColor: '#FF0000' }} />
                    {errors.email && touched.email && <p className={c.error}>{errors.email}</p>}

                    <Field id="password" type="password" name="password" placeholder='пароль' validate={validatePassword}
                        style={errors.password && { borderColor: '#FF0000' }} />
                    {errors.password && touched.password && <p className={c.errorPassword}>{errors.password}</p>}

                    {serverMsg &&
                        <p className={c.alreadyRegisteredMsg}>{serverMsg}</p>
                    }

                    <button type='submit'
                        disabled={isLoading === LoadingStatusEnum.loading || Boolean(errors.email || errors.password)}>
                        ВОЙТИ
                    </button>

                    <div className={c.underBtn}>
                        <Field type='checkbox' name='rememberMe' component={CustomCheckbox} />
                        <label htmlFor='rememberMe'>запомнить меня</label>
                        <span>забыли пароль?</span>
                    </div>

                </div>
            </Form>

        )}

    </Formik>
}