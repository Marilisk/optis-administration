import { Field } from 'formik';
import c from './ChecksGroup.module.scss';
import React, { FC, useState } from 'react';
import AddValueForm from './AddValueForm/AddValueForm';
import { PlusIcon } from '../../assets/navigation_icons/PlusIcon';

interface IChecksGroupProps {
    name: string
    array: string[]
    title: string
    optionsArray: string[]
}

const ChecksGroup: FC<IChecksGroupProps> = ({ name, array, title, optionsArray }: IChecksGroupProps) => {

    const [showAddValue, setShowAddValue] = useState(false)

    return <div className={c.checksWrapper}>
        <h3>{title}</h3>
        <div className={c.grid}>
            {
                optionsArray.map((el, i) => {
                    return <div key={i}
                        className={array.includes(el) ? c.chosenCell : c.cell}>
                        <label>
                            <span>{el}</span>
                            <Field type='checkbox' name={name} value={el} />
                        </label>
                    </div>
                })
            }
        </div>

        {
            showAddValue ? <AddValueForm name={name} setShowAddValue={setShowAddValue} /> :

                <button className={c.btn} type="button" onClick={() => setShowAddValue(true)}>
                    <PlusIcon fill={'#475B73'} />
                </button>
        }
        
    </div>

}

export default React.memo(ChecksGroup)