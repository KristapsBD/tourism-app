import {useState, useEffect, useContext} from 'react'
import MapTest from "./views/MapTest.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./views/Login.jsx";
import Home from "./views/Home.jsx";



function App() {
    const {currentUser} = useContext(AuthContext)
  return (
      <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path={'/'} element={currentUser?<Home/>:<Navigate to="/login"/>}/>
      </Routes>
  )
}

export default App
