import { Navigation } from './Components/Navigation/Navigation';
import { Header } from './Components/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkAuth, selectIsAuth, selectIsManager } from './redux/authSlice';
import c from './App.module.scss'
import { fetchFilterOptions } from './redux/administrateSlice';
import { LoadingDotsPreloader } from './Components/assets/Preloader/LoadingDots/LoadingDotsPreloader';
import { BackToTopButton } from './Components/assets/BackToTopButton/BackToTopButton';
import { MapIcon } from './Components/assets/navigation_icons/MapIcon';

export function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)
  const isManager = useAppSelector(selectIsManager)
  const navigate = useNavigate()
  const [showNav, setShowNav] = useState(false)

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

  let navClassName = c.hiddenNavigationWrap;
  if (showNav) {
    navClassName = c.navigationWrap
  } else if (!isAuth) {
    navClassName = c.noNav
  }

  return <>
    <div className={!isAuth ? c.withoutNavWrap : c.appWrap} >

      <div className={c.headerWrap}>
        <Header />
      </div>

      {isAuth &&
        <button type='button' className={c.showNavLabel}
          onClick={() => setShowNav(!showNav)}>
          <MapIcon fill='#666666' />
        </button>
      }


      <div className={navClassName}
        onMouseLeave={() => setShowNav(false)}
        onClick={() => setShowNav(false)}>
        <Navigation />
      </div>


      <div className={isAuth ? c.desktopWrap : c.plainDesktopWrap }>
        <Outlet />
      </div>

      <BackToTopButton />

    </div>
  </>
}


