import c from './../style.module.scss'
import { FC } from 'react';
import { Field, Form, Formik } from 'formik';
import { useAppDispatch } from '../../../../redux/hooks';
import { fetchEditName } from '../../../../redux/authSlice';

interface INameEditFormProps {
    name: string
    setInputShown: (arg: boolean) => void
    setEditWindowShown: (arg: string) => void
}

export const NameEditForm: FC<INameEditFormProps> = ({ name, setInputShown, setEditWindowShown }: INameEditFormProps) => {
    const dispatch = useAppDispatch()


    return <div onMouseEnter={() => setEditWindowShown('')}>
        <Formik initialValues={{ name }}
            enableReinitialize={true}
            onSubmit={async (values) => {
                try {
                    dispatch(fetchEditName(values.name))
                } catch (error) {
                    console.warn(error);
                    alert('ошибка при изменении имени')
                }
                setInputShown(false)
            }}
        >
            {props => (
                <Form>
                    <div className={c.inputContainer}>
                        <Field name='name' />
                    </div>

                    <button type='submit' />

                </Form>
            )}
        </Formik>
    </div>
}