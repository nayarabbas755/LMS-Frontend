
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Login } from './components/login/login';
import { Route, Routes  ,Navigate } from "react-router-dom";
import { Register } from './components/register/Register';

function App() {
  
  return (
    <div className='container min-h-90vh'>
    
    <Routes>
   
    <Route exact path="/" element={   <Navigate  to="/login" />}>
 
    </Route>

    <Route path='login' element={<Login/>} />
    <Route path='register' element={<Register/>} />
  </Routes>
  </div>
  );
}

export default App;
