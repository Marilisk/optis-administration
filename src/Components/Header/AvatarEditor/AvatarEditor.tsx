import c from './../Header.module.scss';
import { FC, useState } from 'react';
import { AvatarIcon } from '../../assets/navigation_icons/AvatarIcon';
import { API_URL } from '../../../redux/API/api';
import { AvatarDownloader } from './AvatarDownloader/AvatarDownloader';

interface IAvatarEditorProps {
    avatarUrl: string | undefined
    editWindowShown: string
    setEditWindowShown: (arg: string) => void
}

export const AvatarEditor: FC<IAvatarEditorProps> =
    ({ avatarUrl, editWindowShown, setEditWindowShown }: IAvatarEditorProps) => {

        const [isInputShown, setInputShown] = useState(false)

        return <>
            <div className={c.avatarWrap} onMouseEnter={() => setEditWindowShown('avatar')} >

                {avatarUrl ?
                    <img alt='avatar' src={`${API_URL}${avatarUrl}`} />
                    :
                    <AvatarIcon fill='#475B73' />
                }

            </div>

            {editWindowShown === 'avatar' &&
                <div className={c.accordeon} onMouseLeave={() => setEditWindowShown('')}>
                    
                    <div className={c.container}>

                        <button type='button' onClick={() => {
                            setInputShown(true)
                            console.log(isInputShown)
                        } }>
                            Изменить фото
                        </button>

                        {isInputShown &&
                            <AvatarDownloader avatarUrl={avatarUrl} />
                        }

                    </div>
                </div>
            }
        </>
    }