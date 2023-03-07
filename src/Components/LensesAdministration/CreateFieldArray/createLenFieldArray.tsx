import { FieldArray, Field } from 'formik';
import c from './CreateFieldArr.module.scss';
import { DeleteCrossIcon } from './../../assets/navigation_icons/DeleteCrossIcon'
import { useState } from 'react';
import { PlusIcon } from '../../assets/navigation_icons/PlusIcon';
import { AngleUp } from '../../assets/navigation_icons/AngleUp';
import { AngleDown } from '../../assets/navigation_icons/AngleDown';

interface ICreateLenFieldArrayProps {
    name: string
    array: string[] | number[]
    title: string
}

export const CreateLenFieldArray = ({ name, array, title }: ICreateLenFieldArrayProps) => {

    const [isBtnHovered, setIsBtnHovered] = useState<number>()
    const [isExpanded, setIsExpanded] = useState(false)

    return <div className={c.arrayWrapper}>
        <FieldArray name={name}>

            {({ insert, remove, push }) => <>

                <div className={c.header} 
                    onClick={() => setIsExpanded(!isExpanded)}>
                    <h3>{title}</h3>
                    <div className={c.expander}>
                        {
                            isExpanded ?
                                <AngleUp fill='#121212' /> :
                                <AngleDown fill='#121212' />
                        }
                    </div>
                </div>

                    <div onMouseLeave={() => setIsBtnHovered(undefined)}
                        className={isExpanded ? c.grid : c.hiddenGrid} >

                        {
                            array.length > 0 &&
                            array.map((elem, index) => (
                                <div key={index} className={c.line}
                                    onMouseOver={() => setIsBtnHovered(index)}>
                                    <label className={c.arrayLabel}>
                                        <Field name={`${name}.${index}`} type="text" />
                                    </label>

                                    <button type="button"
                                        className={isBtnHovered === index ? c.btn : c.hiddenBtn}
                                        onClick={() => remove(index)}>
                                        <DeleteCrossIcon fill='#475B73' />
                                    </button>
                                </div>
                            ))
                        }

                        <button className={c.addBtn} type="button" onClick={() => push('')}>
                            <PlusIcon fill={'#475B73'} />
                        </button>

                </div>

            </>}

        </FieldArray>

    </div>

}