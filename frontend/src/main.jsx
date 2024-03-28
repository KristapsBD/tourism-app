import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {APIProvider} from "@vis.gl/react-google-maps";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <APIProvider apiKey="AIzaSyBWlQcYAlEUysNw5M6w-irJaLRExlo60Us">
          <App />
      </APIProvider>
  </React.StrictMode>,
)