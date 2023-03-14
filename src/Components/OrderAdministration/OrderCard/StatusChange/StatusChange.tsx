import { Field, Form, Formik } from "formik";
import { FC } from "react";
import { determinateCondition } from "../../OrderRows/functions";
import { OrderConditions } from "./orderConditions";
import c from './StatusChange.module.scss'

interface IStatusChangeProps {
    changeStatus: () => void
    conditionText: string

}


export const StatusChange: FC<IStatusChangeProps> = ({ changeStatus, conditionText }: IStatusChangeProps) => {




    const variants = Object.keys(OrderConditions)
    console.log(variants)
    const radioBtns = variants.map(el => (
        <label key={el}>
            {determinateCondition(el)}
            <Field name='condition' type='radio' value={el} />
        </label>
    ))

    const initialValues = {
        condition: conditionText
    }

    return <div className={c.wrapper}>

        <Formik initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
                console.log(values)
            }
            }
        >
            {props => (
                <Form>
                    {radioBtns}
                    <button type='submit' onClick={() => changeStatus()}>
                        изменить статус
                    </button>
                </Form>
            )}
        </Formik>



    </div>

}