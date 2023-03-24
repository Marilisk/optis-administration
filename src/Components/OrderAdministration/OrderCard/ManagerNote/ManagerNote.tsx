import { Field, Form, Formik } from "formik";
import { FC } from "react";
import c from './ManagerNote.module.scss'

interface IManagerProps {
    note?: string
}

export const ManagerNote: FC<IManagerProps> = ({note}: IManagerProps) => {


    const initialValues = {
        text: note || '',
    }

    return <div className={c.wrap}>

        <Formik initialValues={initialValues}
            onSubmit={async (values) => {
                console.log(values)
            }}>

            {props => (
                <Form>
                    <label>
                        <span>текст</span>
                        <Field name='text' component='textarea' />
                    </label>

                    <button type="submit" 
                        disabled={props.values.text.length < 1}>
                        изменить
                    </button>
                </Form>
            )}
        </Formik>
    </div>

}