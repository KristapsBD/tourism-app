
import MapTest from "./views/MapTest.jsx";
import KgzTest from "./views/KgzTest.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./views/Login.jsx";
import Home from "./views/Home";
import Landing from "./views/Landing.jsx";
import Register from "./views/Register.jsx";



function App() {
    const Auth = useAuth()
    return (
            <Routes>
                //Login
                <Route path='/login' element={<Login/>}/>
                //Register
                <Route path='/register' element={<Register/>}/>
                //Landing page
                <Route path={'/'} element={<Landing/>}/>
                //Homepage
                <Route path={'/home'} element={Auth.userIsAuthenticated() ? <Home/> : <Navigate to="/login"/>}/>
                //Test route for map rendering
                <Route path={'/map'} element={Auth.userIsAuthenticated() ? <MapTest/>:<Navigate to="/login"/>}/>
                //Test route for forms and other components
                <Route path={'/test'} element={Auth.userIsAuthenticated() ? <KgzTest/>:<Navigate to="/login"/>}/>

            </Routes>
    )
}

export default App
