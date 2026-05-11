import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  Plus,
  BarChart3,
  FileCheck,
  User,
  Settings,
  LogOut
} from 'lucide-react'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Sidebar = ({ isOpen }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const [hovered, setHovered] = useState(null)

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Policies', path: '/policies' },
    { icon: Plus, label: 'Add Policy', path: '/policies/new' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: FileCheck, label: 'Claims', path: '/claims' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      transition={{ type: 'spring', damping: 30 }}
      className="fixed inset-y-0 left-0 z-50 w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">🏦</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              InsurePro
            </h1>

            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Enterprise
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2 mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              onMouseEnter={() => setHovered(item.path)}
              onMouseLeave={() => setHovered(null)}
              className={`
                group flex items-center space-x-4 p-3 rounded-2xl transition-all duration-300
                ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                }
                ${hovered === item.path ? 'scale-105 shadow-md' : ''}
              `}
            >
              <motion.div whileHover={{ scale: 1.1 }}>
                <Icon size={20} />
              </motion.div>

              <span className="font-medium text-sm">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-4 p-3 rounded-2xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </motion.div>
  )
}

export default Sidebar