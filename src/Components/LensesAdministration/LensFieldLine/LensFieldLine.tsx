import { Field } from 'formik';
import React, { FC } from 'react';
import c from './../LensesAdministration.module.scss';

interface IFieldLineProps {
    label: string
    name: string
    type?: string
}

const LensFieldLine: FC<IFieldLineProps> = ({label, name, type}:IFieldLineProps) => {

    console.log('in LensFieldLine')
    
    return <div className={c.inputWrapper}>
        <label>
            <div>{label}</div>
            <Field type={type || 'text'} id={name} name={name} />
        </label>
    </div>

}

export default React.memo(LensFieldLine)