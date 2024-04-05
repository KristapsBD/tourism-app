import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({
    currentUser: null,
    setCurrentUser: () => {},
    signIn: async (email, password) => {},
    signOut: () => {}
});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthState = async () => {
            try {
                const res = await axios.get('/api/user');
                const user = res.data;
                if (user) {
                    setCurrentUser(user);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        checkAuthState();
    }, []);

    const signIn = async (email, password) => {
        try {
            const userData = { email, password };
            const res = await axios.post('/api/user/login', userData);
            if (res) {
                setCurrentUser(res.data);
                navigate('/');
            } else {
                console.log("Something went wrong");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const signOut = () => {
        axios.get('/api/user/logout');
        setCurrentUser(null);
        navigate('/');
    };

    const value = {
        currentUser,
        setCurrentUser,
        signIn,
        signOut
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
