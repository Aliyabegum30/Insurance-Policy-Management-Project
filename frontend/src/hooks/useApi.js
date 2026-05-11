import { useState, useEffect, useCallback } from 'react'

import api from '../services/api'

import toast from 'react-hot-toast'

const useApi = (url = '') => {

  const [data, setData] = useState([])

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(null)

  // ======================
  // Fetch Data
  // ======================

  const fetchData = useCallback(async () => {

    if (!url) return

    setLoading(true)

    setError(null)

    try {

      const response = await api.get(url)

      // Handle all possible API formats

      if (Array.isArray(response.data)) {

        setData(response.data)

      } else if (Array.isArray(response.data.data)) {

        setData(response.data.data)

      } else if (response.data.data) {

        setData(response.data.data)

      } else {

        setData(response.data || [])
      }

    } catch (err) {

      console.error('API Error:', err)

      setError(err)

      setData([])

    } finally {

      setLoading(false)
    }

  }, [url])

  // ======================
  // POST Method
  // ======================

  const post = async (endpoint, payload) => {

    setLoading(true)

    setError(null)

    try {

      const response = await api.post(
        endpoint,
        payload
      )

      toast.success(
        response?.data?.message ||
        'Created successfully'
      )

      // IMPORTANT
      // Refresh latest data after create

      if (url) {

        await fetchData()
      }

      return response.data

    } catch (err) {

      console.error('POST Error:', err)

      setError(err)

      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        'Failed to create'
      )

      throw err

    } finally {

      setLoading(false)
    }
  }

  // ======================
  // PUT Method
  // ======================

  const put = async (endpoint, payload) => {

    setLoading(true)

    setError(null)

    try {

      const response = await api.put(
        endpoint,
        payload
      )

      toast.success(
        response?.data?.message ||
        'Updated successfully'
      )

      if (url) {

        await fetchData()
      }

      return response.data

    } catch (err) {

      console.error('PUT Error:', err)

      setError(err)

      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        'Update failed'
      )

      throw err

    } finally {

      setLoading(false)
    }
  }

  // ======================
  // DELETE Method
  // ======================

  const remove = async (endpoint) => {

    setLoading(true)

    setError(null)

    try {

      const response = await api.delete(endpoint)

      toast.success(
        response?.data?.message ||
        'Deleted successfully'
      )

      if (url) {

        await fetchData()
      }

      return response.data

    } catch (err) {

      console.error('DELETE Error:', err)

      setError(err)

      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        'Delete failed'
      )

      throw err

    } finally {

      setLoading(false)
    }
  }

  // ======================
  // Auto Fetch
  // ======================

  useEffect(() => {

    fetchData()

  }, [fetchData])

  return {

    data,

    loading,

    error,

    refetch: fetchData,

    post,

    put,

    remove
  }
}

export default useApi