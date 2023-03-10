import { FieldArray, Field } from 'formik';
import c from './CreateFieldArr.module.scss';
import React, { FC } from 'react';
import { DeleteCrossIcon } from '../assets/navigation_icons/DeleteCrossIcon';

interface ICreateFieldArrayProps {
    name: string
    array: string[]
    title: string
}

const CreateFieldArray: FC<ICreateFieldArrayProps> = ({ name, array, title, }: ICreateFieldArrayProps) => {


    return <div className={c.arrayWrapper}>

        <FieldArray name={name}>

            {({ insert, remove, push }) => (
                <div>
                    <div className={c.flexHead}>
                        <h3>{title}</h3>
                        <button className={c.addBtn} type="button" onClick={() => push('')}>
                            добавить поле
                        </button>
                    </div>
                    {array.length > 0 &&
                        array.map((elem, index) => (
                            <div key={index} className={c.line}>

                                <label className={c.arrayLabel}>
                                    <Field name={`${name}.${index}`} type="text" value={elem} />
                                </label>
                                <button type="button" className={c.btn} onClick={() => remove(index)}>
                                    <DeleteCrossIcon fill='#666666' />
                                </button>
                            </div>
                        ))}

                </div>
            )}

        </FieldArray>
    </div>
}

export default React.memo(CreateFieldArray)