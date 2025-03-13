import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import React from 'react'

const App = () => {
  return (
    <>

    <BrowserRouter>
    <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/login" element = {<Login/>} />
        <Route path = "/register" element = {<Register/>} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App