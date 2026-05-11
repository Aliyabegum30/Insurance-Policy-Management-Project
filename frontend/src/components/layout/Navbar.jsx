import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'

import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = ({
  sidebarOpen = false,
  toggleSidebar = () => {},
  toggleDarkMode,
  darkMode
}) => {

  const [searchOpen, setSearchOpen] = useState(false)

  // Prevent crash if AuthContext not available
  const auth = useAuth?.() || {}

  const user = auth.user || {
    name: 'User'
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl sticky top-0 z-40 border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Left Side */}
          <div className="flex items-center gap-4">

            {/* Mobile menu */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-indigo-600"
            >
              InsurancePro
            </Link>

            {/* Menu */}
            <div className="hidden md:flex items-center gap-6 ml-6">

              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600"
              >
                Dashboard
              </Link>

              <Link
                to="/add-policy"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600"
              >
                Add Policy
              </Link>

              <Link
                to="/policies"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600"
              >
                Policies
              </Link>

              <Link
                to="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* Search */}
          <AnimatePresence>

            {searchOpen ? (

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 'auto' }}
                exit={{ width: 0 }}
                className="relative ml-4 flex-1 max-w-md"
              >

                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search policies..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />

              </motion.div>

            ) : (

              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Search size={20} />
              </button>

            )}

          </AnimatePresence>

          {/* Right */}
          <div className="flex items-center space-x-4">

            <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 relative">
              <Bell size={20} />
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >

              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">

                <span className="text-white font-semibold text-sm">
                  {user?.name?.[0] || 'U'}
                </span>

              </div>

              <div className="hidden sm:block">

                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.name || 'User'}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Admin
                </p>

              </div>

              <ChevronDown className="w-4 h-4 text-gray-500" />

            </motion.div>

          </div>

        </div>

      </div>

    </motion.nav>
  )
}

export default Navbar