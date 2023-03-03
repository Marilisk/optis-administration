import c from './AddValueForm.module.scss';
import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import { addNewOption } from '../../../../redux/administrateSlice';

interface IAddValueFormProps {
    name: string
    setShowAddValue: (arg: boolean) => void
}

const AddValueForm: FC<IAddValueFormProps> = ({ name, setShowAddValue }: IAddValueFormProps) => {
    const dispatch = useAppDispatch()
    const [text, setText] = useState('')

    return <div className={c.wrapper}>

        <div className={c.inputWrapper}>
            <input type={'text'} onChange={(e) => {
                setText(e.currentTarget.value)
            }}
            />
            <button className={c.btn} type="button"
                onClick={() => {
                    dispatch(addNewOption({name, value: text}))
                    setText('')
                    setShowAddValue(false)
                }}
            >
                добавить поле
            </button>
        </div>
    </div>

}

export default React.memo(AddValueForm)