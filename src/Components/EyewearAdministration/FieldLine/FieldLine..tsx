import { Field } from 'formik';
import React, { FC } from 'react';
import c from './../Administration.module.scss';

interface IFieldLineProps {
    label: string
    name: string
    type?: string
}

const FieldLine: FC<IFieldLineProps> = ({label, name, type}:IFieldLineProps) => {


    return <div className={c.inputWrapper}>
        <label>
            <span>{label}</span>
            <Field type={type || 'text'} id={name} name={name} />
        </label>
    </div>

}

export default React.memo(FieldLine)