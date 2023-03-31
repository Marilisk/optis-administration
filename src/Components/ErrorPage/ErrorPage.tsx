import c from './ErrorPage.module.scss'


export const ErrorPage = () => {


    return <div className={c.wrap}>
        <h1>
            Извините, что-то сломалось.
        </h1>
        <p>попробуйте обновить страницу или проверьте сетевое подключение.</p>
    </div>

}