import './App.css';
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { useStore } from './store/storeContext';
import { Fragment } from 'react/jsx-runtime';
import AppHeader from './components/appHeader';
import { AppRoutes } from './components/appRoutes';
import { useEffect } from 'react';
import { useLang } from './resources/langContext';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  const store = useStore();
  const { dir } = useLang();

  useEffect(() => {
    store.auth.autoSignIn();
  }, [store.auth])

  return (
    <Fragment>
      <ToastContainer position={dir === "rtl" ? "top-left" : "top-right"} rtl={dir === "rtl"} style={{ marginTop: 100 }} autoClose={3000} closeOnClick={true} />
      <AppHeader />
      <div className="body">
        <AppRoutes />
      </div>
    </Fragment>
  );
}

