import {useState, useEffect, useContext} from 'react'
import MapTest from "./views/MapTest.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/home/Login";
import Home from "./views/Home";


function App() {
    // const {currentUser} = useContext(AuthProvider)
    return (
        <AuthProvider>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                {/*<Route path={'/'} element={currentUser ? <Home/> : <Navigate to="/login"/>}/>*/}
            </Routes>
        </AuthProvider>
    )
}

export default App
