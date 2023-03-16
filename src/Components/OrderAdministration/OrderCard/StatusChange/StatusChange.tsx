import { Form, Formik } from "formik";
import { FC } from "react";
import { LoadingStatusEnum, OrderConditionsType } from "../../../../types/types";
import { OrderConditions } from "./orderConditions";
import { determinateCondition } from "../../OrderRows/functions";
import c from './StatusChange.module.scss'
import { useAppSelector } from "../../../../redux/hooks";

interface IStatusChangeProps {
    changeStatus: (arg: OrderConditionsType) => void
    conditionText: string
    condition: string

}


export const StatusChange: FC<IStatusChangeProps> = ({ changeStatus, conditionText, condition }: IStatusChangeProps) => {

    const loadingStatus = useAppSelector(s => s.orders.orders.status)
    const variants = Object.values(OrderConditions)

    const initialValues = {
        condition: condition as OrderConditionsType
    }

    return <div className={c.wrapper}>

        <Formik initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
                console.log(values)
                changeStatus(values.condition)
            }}
        >
            {props => (
                <Form>
                    <div className={c.radiosContainer}>
                        {variants.map(el => {
                            const condition = determinateCondition(el)
                            return <div key={el}
                                className={conditionText === condition ? c.chosen : c.plain}>

                                <label>
                                    {condition}
                                    <input disabled={loadingStatus === LoadingStatusEnum.loading}
                                        name='condition' type='radio' value={el}
                                        onChange={(e: React.ChangeEvent<any>) => {
                                            props.handleChange(e)
                                            props.handleSubmit(e)
                                        }} />
                                </label>

                                <div className={c.arrow} />
                            </div>
                        })}
                    </div>
                </Form>
            )}
        </Formik>
    </div>

}