import c from './RegisterForm.module.scss';
import { Field, Form, Formik } from 'formik';
import { validateEmail, validatePassword, validateFullName } from '../LoginForm/loginValidate';
import snowFlake from './icons/snowflake.png';
import errorInput from './icons/errorInput.png';
import check from './icons/check.png';
import { FC, useState } from 'react';
import { LoadingStatusEnum } from '../../types/types';
import { useAppDispatch } from '../../redux/hooks';
import { fetchRegister } from '../../redux/authSlice';
import { CustomCheckbox } from '../assets/CustomCheckbox/CustomCheckbox';

interface IRegisterForm {
    isLoading: LoadingStatusEnum
    navigate: (arg: number) => void
}
export const RegisterForm: FC<IRegisterForm> = ({ isLoading, navigate }: IRegisterForm) => {
    
    const [alreadyRegisteredMsg, setAlreadyRegisteredMsg] = useState<string | null>(null)
    const dispatch = useAppDispatch()

    return <Formik initialValues={{
        fullName: '',
        email: '',
        password: '',
        rememberMe: true,
    }}
        onSubmit={async (values, actions) => {
            const payload = { email: values.email, password: values.password, fullName: values.fullName };
            const response = await dispatch(fetchRegister(payload))
            console.log(response)
            if (response.meta.requestStatus === 'rejected' /* === "Request failed with status code 400" */) {
                console.log('response', response)
                setAlreadyRegisteredMsg('Пользователь с таким email уже зарегистрирован')
                actions.resetForm();
            } else if (response.payload && 'email' in response.payload) {
                if (values.rememberMe) { localStorage.setItem('email', values.email) }
                actions.resetForm();
                navigate(-1)
            } else {
                console.log(response);
            }
        }}
    >

        {({ errors, touched }) => (
            <Form >
                <div className={c.wrap}>

                    <Field id='fullName' name='fullName' placeholder='Ваше полное имя' validate={validateFullName}
                        style={errors.fullName && { borderColor: '#ff0000', color: '#ff0000' }} />
                    {errors.fullName && touched.fullName && <p className={c.errorFullname}>
                        {errors.fullName}
                    </p>}
                    <img alt=''
                        src={errors.fullName && touched.fullName ? errorInput :
                            touched.fullName ? check : snowFlake}
                        className={c.fullNameIcon} />

                    <Field id='email' name='email' placeholder='email' validate={validateEmail}
                        style={errors.email && { borderColor: '#ff0000', color: '#ff0000' }} />
                    {errors.email && touched.email && <p className={c.errorEmail}>{errors.email}</p>}
                    <img alt=''
                        src={errors.email && touched.email ? errorInput :
                            touched.email ? check : snowFlake}
                        className={c.emailIcon} />

                    <Field id="password" type="password" name="password" placeholder='пароль' validate={validatePassword}
                        style={errors.password && { borderColor: '#ff0000', color: '#ff0000' }} />
                    {errors.password && touched.password && <p className={c.errorPassword}>{errors.password}</p>}
                    <img alt=''
                        src={errors.password && touched.password ? errorInput :
                            touched.password ? check : snowFlake}
                        className={c.passwordIcon} />

                    {alreadyRegisteredMsg && <p className={c.alreadyRegisteredMsg}>{alreadyRegisteredMsg}</p>}

                    <button type='submit'
                        className={(errors.fullName || errors.email || errors.password || isLoading === LoadingStatusEnum.loading) ?
                            c.btnEnabled : undefined}>
                        ЗАРЕГИСТРИРОВАТЬСЯ
                    </button>

                    <div className={c.underBtn}>
                        <Field type='checkbox' name='rememberMe' component={CustomCheckbox} />
                        <label htmlFor='rememberMe'>запомнить меня</label>
                    </div>

                </div>
            </Form>

        )}

    </Formik>
}