import c from './SubmitButton.module.scss'
import React, { FC } from 'react';
import { LoadingStatusEnum } from '../../../types/types';

interface ISubmitButtonProps {
    status: LoadingStatusEnum
    imagesMainLength: number 
}

const SubmitButton: FC<ISubmitButtonProps> = ({ status, imagesMainLength }: ISubmitButtonProps) => {




    return <button className={c.submitBtn}
        disabled={status === LoadingStatusEnum.loading || !Boolean(imagesMainLength)}
        type='submit'>
        ОТПРАВИТЬ
    </button>
}

export default React.memo(SubmitButton)