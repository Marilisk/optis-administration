import c from './../Header.module.scss';
import { FC, useState } from 'react';
import { AvatarIcon } from '../../assets/navigation_icons/AvatarIcon';
import { API_URL } from '../../../redux/API/api';
import { AvatarDownloader } from './AvatarDownloader/AvatarDownloader';

interface IAvatarEditorProps {
    avatarUrl: string | undefined
    isAvatarHovered: boolean
    setAvatarIsHovered: (arg: boolean) => void
}

export const AvatarEditor: FC<IAvatarEditorProps> =
    ({ avatarUrl, isAvatarHovered, setAvatarIsHovered }: IAvatarEditorProps) => {

        const [isInputShown, setInputShown] = useState(false)


        return <div className={c.avatarWrap}
            onMouseEnter={() => setAvatarIsHovered(true)} >

            {avatarUrl ?
                <img alt='avatar' src={`${API_URL}${avatarUrl}`} />
                :
                <AvatarIcon fill='#475B73' />
            } 

            {isAvatarHovered &&
                <div className={c.accordeon} onMouseLeave={() => setAvatarIsHovered(false)}>

                    <button type='button' onClick={() => setInputShown(true)}>
                        Изменить фото
                    </button>

                    {isInputShown &&
                        <AvatarDownloader avatarUrl={avatarUrl} />
                    }
                </div>
            }

        </div>
    }