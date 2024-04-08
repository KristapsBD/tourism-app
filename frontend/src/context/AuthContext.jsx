import React, {createContext, useContext, useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {tourismApi} from "../components/misc/TourismApi.jsx";

const AuthContext = createContext()

function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        setUser(storedUser)
    }, [])

    //TODO
    //Make a integration with TourismApi.jsx
    const getUser = () => {
        return JSON.parse(localStorage.getItem('user'))
    }
    //Returns true if user is set
    const userIsAuthenticated = () => {
        return localStorage.getItem('user') !== null
    }
    //Remade
    //Now this function is responsible for user login
    const userLogin = async (username, password) => {
        const res= await tourismApi.authenticate(username, password)
        const {id, name, role} = res.data
        const authData = window.btoa(username + ':' + password)
        const user = {id, name, role, authData}
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
        navigate('/')
    }
    //TODO
    //Needs to be remade
    const userLogout = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    const contextValue = {
        user,
        getUser,
        userIsAuthenticated,
        userLogin,
        userLogout,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export function useAuth() {
    return useContext(AuthContext)
}

export {AuthProvider}