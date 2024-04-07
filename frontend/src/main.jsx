import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {APIProvider} from "@vis.gl/react-google-maps";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
                    <App/>
                </APIProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
