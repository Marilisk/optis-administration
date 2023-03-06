import { Navigation } from './Components/Navigation/Navigation';
import { Header } from './Components/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkAuth, selectIsAuth, selectIsManager } from './redux/authSlice';
import c from './App.module.scss'
import { fetchFilterOptions } from './redux/administrateSlice';
import { LoadingDotsPreloader } from './Components/assets/Preloader/LoadingDots/LoadingDotsPreloader';

export function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)
  const isManager = useAppSelector(selectIsManager)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isManager) {
      navigate('/noadminerror')
    }
  }, [isManager, navigate])

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth, navigate])

  useEffect(() => {
    dispatch(fetchFilterOptions('features'));
    dispatch(fetchFilterOptions('color'));
    dispatch(fetchFilterOptions('shape'));
    dispatch(fetchFilterOptions('material'));
  }, [dispatch])

  if (localStorage.getItem('token') && !isAuth) {
    return <LoadingDotsPreloader />
  }

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


