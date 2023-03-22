import { Field } from 'formik';
import React, { FC } from 'react';
import { validateField } from '../../EyewearAdministration/FieldLine/FieldLine.';
import c from './../LensesAdministration.module.scss';

interface IFieldLineProps {
    label: string
    name: string
    type?: string
    error?: string
}

const LensFieldLine: FC<IFieldLineProps> = ({label, name, type, error}:IFieldLineProps) => {

    return <div className={c.inputWrapper}>
        <label>
            <div>{label}</div>
            <Field type={type || 'text'} id={name} name={name}
            validate={validateField}
            style={error && { borderColor: '#FF0000' }} />
        </label>
    </div>
}

export default React.memo(LensFieldLine)