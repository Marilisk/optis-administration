import { Field, Form, Formik } from "formik";
import { FC } from "react";
import c from './Manager.module.scss'

interface IManagerProps {
    manager: string | undefined
}

export const Manager: FC<IManagerProps> = ({ manager }: IManagerProps) => {


    const initialValues = {
        name: manager || '',
        phone: '',
    }

    return <div className={c.wrap}>

        <Formik initialValues={initialValues}
            onSubmit={async (values) => {
                console.log(values)
            }}>

            {props => (
                <Form>
                    <label>
                        <span>имя</span>
                        <Field name='name' />
                    </label>

                    <label>
                        телефон
                        <Field name='phone' />
                    </label>

                    <button type="submit">
                        изменить
                    </button>
                </Form>
            )}
        </Formik>
    </div>

}