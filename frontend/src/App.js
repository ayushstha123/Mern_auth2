import './App.css';
import Header from './components/Header';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
  <BrowserRouter>
  <Header/>
  <ToastContainer/>
  <Routes>
  <Route path="/" element={<Home/>}></Route>

    <Route path="/Signin" element={<SignIn/>}></Route>
    <Route path="/Signup" element={<Signup/>}></Route>
 
  </Routes>
   </BrowserRouter>
  );
}

export default App;
