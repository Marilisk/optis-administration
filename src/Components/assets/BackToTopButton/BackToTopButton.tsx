import c from './BackToTopButton.module.scss'
import { useEffect, useState } from 'react';
import { AngleUp } from '../navigation_icons/AngleUp';


export const BackToTopButton = () => {
    const [btnNeeded, setBtnNeeded] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 260) {
                setBtnNeeded(true)
            } else {
                setBtnNeeded(false)
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return <>
        {
            btnNeeded &&
            <div className={c.wrap}>
                <button type='button' onClick={() => scrollUp()}>
                    <AngleUp fill='#666666' />
                </button>
            </div>
        }
    </>
}