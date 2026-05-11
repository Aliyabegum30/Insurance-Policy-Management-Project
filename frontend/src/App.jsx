import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/Footer'

import Dashboard from './pages/Dashboard'
import AddPolicy from './pages/AddPolicy'
import ViewPolicies from './pages/ViewPolicies'
import About from './pages/About'
import Contact from './pages/Contact'

import { Toaster } from 'react-hot-toast'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode')

    if (savedTheme === 'true') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newTheme = !darkMode

    setDarkMode(newTheme)

    if (newTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    localStorage.setItem('darkMode', newTheme)
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? 'dark bg-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'
      }`}
    >
      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Content */}
      <main className="pt-20 pb-12 px-4 md:px-8">
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Policies */}
          <Route path="/add-policy" element={<AddPolicy />} />
          <Route path="/policies" element={<ViewPolicies />} />

          {/* Extra Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Redirect Unknown Routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  )
}

export default App