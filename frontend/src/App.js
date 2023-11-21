import './App.css';
import Header from './components/Header';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
  <Header/>
  <Routes>

    <Route path="/Signin" element={<SignIn/>}></Route>
    <Route path="/Signup" element={<Signup/>}></Route>
 
  </Routes>
   </BrowserRouter>
  );
}

export default App;
