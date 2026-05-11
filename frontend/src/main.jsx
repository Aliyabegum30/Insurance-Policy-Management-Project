import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter
} from 'react-router-dom'

import App from './App.jsx'
import './index.css'

import { Toaster } from 'react-hot-toast'

import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>

    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#3b82f6',
          color: '#fff'
        }
      }}
    />

  </React.StrictMode>
)