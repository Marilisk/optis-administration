import { FieldArray, Field } from 'formik';
import c from './CreateFieldArr.module.scss';

interface ICreateLenFieldArrayProps {
    name: string
    array: string[] | number[]
    title: string
}

export const CreateLenFieldArray = ({ name, array, title}:ICreateLenFieldArrayProps) => {

    return <div className={c.arrayWrapper}>
        <FieldArray name={name}>

            {({ insert, remove, push }) => (
                <div>
                    <span>{title}</span>
                    {array.length > 0 &&
                        array.map((elem, index) => (
                            <div key={index} className={c.line}>
                                <label className={c.arrayLabel}>
                                    <Field name={`${name}.${index}`} type="text" />
                                </label>
                                <button type="button" className={c.btn} onClick={() => remove(index)}>
                                    удалить
                                </button>
                            </div>
                        ))}
                    <button className={c.btn} type="button" onClick={() => push('')}>добавить поле</button>
                </div>
            )}

        </FieldArray>


    </div>

}