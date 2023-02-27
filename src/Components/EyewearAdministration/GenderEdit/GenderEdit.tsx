import { Field } from 'formik';
import { FC } from 'react';
import c from './GenderEdit.module.scss';
import React from 'react';


interface IGenderEditProps {
    values: string
}

const GenderEdit: FC<IGenderEditProps> = ({ values }: IGenderEditProps) => {

    return <div className={c.genderEdit}>
        <span>гендер</span>

        <label >
            <div className={values === 'Мужские' ? c.chosenJaw : c.jaw}>
                Мужские
            </div>
            <Field type={'radio'} name="gender" value={'Мужские'} />
        </label>
        <label >
            <div className={values === "Женские" ? c.chosenJaw : c.jaw}>
                Женские
            </div>
            <Field type={'radio'} name="gender" value={'Женские'} />
        </label>

    </div>
}

export default React.memo(GenderEdit)