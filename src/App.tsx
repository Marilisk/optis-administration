import { Navigation } from './Components/Navigation/Navigation';
import { Header } from './Components/Header/Header';
import { Outlet, redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkAuth, selectIsAuth } from './redux/authSlice';
import c from './App.module.scss'

export function App() {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth) {
      redirect('/login')
    }

  })

  return <>
    <div className={c.appWrap}>
      <div className={c.headerWrap}>
        <Header />
      </div>
      {isAuth &&
        <div className={c.navigationWrap}>
          <Navigation />
        </div>
      }


      <div className={c.desktopWrap}>
        <Outlet />
      </div>



    </div>
  </>
}


