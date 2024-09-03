import logo from './logo.svg';
import './App.scss';
import Home from './Comonents/Home';
import Login from './Comonents/Login';
import { AllRoutes } from './AllRoutes/AllRoute';
import PrivateRoute from './AllRoutes/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
<AllRoutes/>
<PrivateRoute/>
<ToastContainer/>

    </div>
  );
}

export default App;
