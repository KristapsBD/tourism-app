
import MapTest from "./views/MapTest.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./views/Login.jsx";
import Home from "./views/Home";


function App() {
    const Auth = useAuth()
    return (
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path={'/'} element={Auth.userIsAuthenticated() ? <Home/> : <Navigate to="/login"/>}/>
                <Route path={'/map'} element={Auth.userIsAuthenticated() ? <MapTest/>:<Navigate to="/login"/>}/>
            </Routes>
    )
}

export default App
