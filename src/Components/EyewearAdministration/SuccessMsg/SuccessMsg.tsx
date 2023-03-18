import c from './SuccessMsg.module.scss'
import React, { FC } from 'react';

interface ISuccessMsgProps {
    successmsg: string | null
    handleReset: () => void
    setSuccessMsg: (arg: null) => void
}

const SuccessMsg: FC<ISuccessMsgProps> = ({ successmsg, handleReset, setSuccessMsg }: ISuccessMsgProps) => {


    if (!successmsg) {
        return null
    }

    return <div className={c.container}>

        <p>товар успешно создан</p>
        <div>
            <button type='button'
                onClick={() => window.open(`https://spboptis.ru/product/${successmsg}`, '_blank')}>
                перейти на страницу товара
            </button>
            <button type='button'
                onClick={() => {
                    handleReset()
                    setSuccessMsg(null)
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                }}>
                добавить еще один товар
            </button>
        </div>

    </div>
}

export default React.memo(SuccessMsg)