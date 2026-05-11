import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'

import { jwtDecode } from 'jwt-decode'
import api from '../services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const token = localStorage.getItem('token')

    if (token) {
      try {

        const decoded = jwtDecode(token)

        setUser(decoded)

        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token}`

      } catch (error) {
        localStorage.removeItem('token')
      }
    }

    setLoading(false)

  }, [])

  const login = async (email, password) => {

    const response = await api.post('/auth/login', {
      email,
      password
    })

    const token = response.data.data.token
    const userData = response.data.data.user

    localStorage.setItem('token', token)

    api.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`

    setUser(userData)

    toast.success('Login successful')

    return userData
  }

  const register = async (email, password, name) => {

    const response = await api.post('/auth/register', {
      email,
      password,
      name
    })

    const token = response.data.data.token
    const userData = response.data.data.user

    localStorage.setItem('token', token)

    api.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`

    setUser(userData)

    toast.success('Registration successful')

    return userData
  }

  const logout = () => {

    localStorage.removeItem('token')

    delete api.defaults.headers.common['Authorization']

    setUser(null)

    toast.success('Logged out')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContext