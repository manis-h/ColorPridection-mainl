import logo from './logo.svg';
import './App.scss';
import Header from './Components/Header';
import { Slider } from './Components/Slider';
import { AllRoutes } from './AllRoutes/AllRoute';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Components/Footer';
import BetPage from './Components/BetPage';
import { ToastContainer } from 'react-toastify';

function App() {


  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }
  return (
    <div className="App">
<div className='navheightissu'>
     <Header/>
     </div>
    <AllRoutes/>
  
  <ToastContainer/>
    </div>
  );
}

export default App;
