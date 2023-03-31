import c from './SubmitButton.module.scss'
import React, { FC } from 'react';
import { LoadingStatusEnum } from '../../../types/types';

interface ISubmitButtonProps {
    status: LoadingStatusEnum
    imagesMainLength: number
    errors: object
}

const SubmitButton: FC<ISubmitButtonProps> = ({ status, imagesMainLength, errors }: ISubmitButtonProps) => {
    console.log('sbm btn' , errors)
    return <button className={c.submitBtn}
        disabled={status === LoadingStatusEnum.loading
            || !Boolean(imagesMainLength)
            || Boolean(Object.keys(errors).length)}
        type='submit'>
        ОТПРАВИТЬ
    </button>
}

export default React.memo(SubmitButton)