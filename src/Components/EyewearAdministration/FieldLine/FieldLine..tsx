import { Field } from 'formik';
import React, { FC } from 'react';
import c from './../Administration.module.scss';

interface IFieldLineProps {
    label: string
    name: string
    type?: string
    error?: string
}

export const validateField = (value: string | number ) => {
    let error;
    if (typeof value === "string" && !value) {
        error = 'заполните поле';
    } else if (typeof value === "number" && value < 0) {
        error = 'заполните поле';
    }
    return error;
}

const FieldLine: FC<IFieldLineProps> = ({ label, name, type, error }: IFieldLineProps) => {

    return <div className={c.inputWrapper}>
        <label>
            <span>{label}</span>
            <Field type={type || 'text'} id={name} name={name} 
                validate={validateField}
                style={error && { borderColor: '#FF0000' }} />
        </label>
    </div>
}

export default React.memo(FieldLine)