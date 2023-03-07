import c from './style.module.scss';
import { FC, useState } from 'react';
import { NameEditForm } from './NameEditor/NameEditForm';

interface INameEditorProps {
    name: string
    editWindowShown: string
    setEditWindowShown: (arg: string) => void
}

export const NameEditor: FC<INameEditorProps> = ({ name, editWindowShown, setEditWindowShown }: INameEditorProps) => {

    const [isInputShown, setInputShown] = useState(false)


    return <div className={c.wrap}>
        <div className={c.nameWrap} onMouseEnter={() => setEditWindowShown('name')}>
            {isInputShown ?
                <NameEditForm name={name} setInputShown={setInputShown} setEditWindowShown={setEditWindowShown} /> :
                <span>{name}</span>
            }
        </div>

        {
            editWindowShown === 'name' &&
            <div className={c.nameAccordeon}>
                <button type='button' onClick={() => {
                    setInputShown(true)
                    setEditWindowShown('')
                }}>
                    Изменить имя
                </button>
            </div>

        }
    </div>
}