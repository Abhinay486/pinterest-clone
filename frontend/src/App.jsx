import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import React from 'react'
import { UserData } from "./context/UserContext.jsx";
import { Toaster } from "react-hot-toast";
import { LoadingAnimationpage } from "./components/Loading.jsx";
import Navbar from "./components/Navbar.jsx";
import PinPage from "./pages/PinPage.jsx";
import Create from "./pages/Create.jsx";
const App = () => {
    const {user, loading, isAuth} = UserData()

  return (
    <>

    {
        loading ? (<LoadingAnimationpage />) :
        (
            <BrowserRouter>
            {isAuth && <Navbar user={user} />}
            <Routes>
                <Route path = "/" element = {isAuth ? <Home/> : <Login />} />
                <Route path = "/create" element = {isAuth ? <Create/> : <Login />} />
                <Route path = "/pin/:id" element = {isAuth ? <PinPage user={user}/> : <Login />} />
                <Route path = "/login" element = {isAuth ? <Home/> : <Login />} />
                <Route path = "/register" element = {isAuth ? <Home/> : <Register/>} />
        
            </Routes>
            </BrowserRouter>
        )
    }
    </>
  )
}

export default App