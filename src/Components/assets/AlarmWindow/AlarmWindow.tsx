import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { confirmDelete, showAlarmWindow } from '../../../redux/productsSlice'
import c from './AlarmWindow.module.scss'


export const AlarmWindow = () => {

    const isAlarmShown = useAppSelector(s => s.products.alarmWindow.isShown)
    const dispatch = useAppDispatch()
    const text = useAppSelector(s => s.products.alarmWindow.text)
     
    if (!isAlarmShown) {
        return null
    }

    return <>
        <div className={c.darkBack} onClick={() => dispatch(showAlarmWindow(false)) } />

        <div className={c.window}>
            <div>{text}</div>

            <button type='button' onClick={() => dispatch(confirmDelete())}>
                да
            </button>

            <button type='button' onClick={() => dispatch(showAlarmWindow(false))}>
                нет
            </button>
        </div>
    </>
}