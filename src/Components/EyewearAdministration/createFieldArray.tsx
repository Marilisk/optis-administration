import { FieldArray, Field } from 'formik';
import c from './CreateFieldArr.module.scss';
import React, { FC } from 'react';

interface ICreateFieldArrayProps {
    name: string
    array: string[]
    title: string
}


const CreateFieldArray: FC<ICreateFieldArrayProps> = ({ name, array, title }: ICreateFieldArrayProps) => {
    

    

    return <div className={c.arrayWrapper}>

        <FieldArray name={name}>

            {({ insert, remove, push }) => (
                <div>
                    <span>{title}</span>
                    {array.length > 0 &&
                        array.map((elem, index) => (
                            <div key={index} className={c.line}>
                                <label className={c.arrayLabel}
                                    onClick={() => push(elem)} >
                                    {/* <Field name={`${name}.${index}`} type="text" /> */}
                                    <Field name={`${name}.${index}`} type="text" value={elem} />
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

export default React.memo(CreateFieldArray)