import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/auth/Login'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='/login' element={<Login/>}></Route>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App