import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import PolicyCard from '../components/PolicyCard'
import PolicyTable from '../components/PolicyTable'

import useApi from '../hooks/useApi'

import {
  ArrowLeftIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

const ViewPolicies = () => {

  const [searchParams, setSearchParams] =
    useSearchParams()

  const [viewMode, setViewMode] =
    useState('cards')

  const [searchTerm, setSearchTerm] =
    useState(searchParams.get('q') || '')

  const [suggestions, setSuggestions] =
    useState([])

  // ======================
  // API
  // ======================

  const {
    data,
    loading,
    error,
    refetch
  } = useApi('/policies')

  // ======================
  // Policies
  // ======================

  const policies = Array.isArray(data)
    ? data
    : []

  // ======================
  // URL Sync
  // ======================

  useEffect(() => {

    const params = new URLSearchParams()

    if (searchTerm.trim()) {

      params.set('q', searchTerm)
    }

    setSearchParams(params)

  }, [searchTerm])

  // ======================
  // Suggestions
  // ======================

  useEffect(() => {

    if (!searchTerm.trim()) {

      setSuggestions([])

      return
    }

    const search =
      searchTerm.toLowerCase()

    const filtered =
      policies.filter((policy) => {

        const holder =
          String(
            policy?.policyHolder || ''
          ).toLowerCase()

        const number =
          String(
            policy?.policyNumber || ''
          ).toLowerCase()

        const type =
          String(
            policy?.type || ''
          ).toLowerCase()

        return (
          holder.includes(search) ||
          number.includes(search) ||
          type.includes(search)
        )
      })

    setSuggestions(
      filtered.slice(0, 5)
    )

  }, [searchTerm, policies])

  // ======================
  // Search Handler
  // ======================

  const handleSearch = (value) => {

    setSearchTerm(value)
  }

  // ======================
  // Filter Policies
  // ======================

  const filteredPolicies =
    policies.filter((policy) => {

      const holder =
        String(
          policy?.policyHolder || ''
        ).toLowerCase()

      const number =
        String(
          policy?.policyNumber || ''
        ).toLowerCase()

      const type =
        String(
          policy?.type || ''
        ).toLowerCase()

      const search =
        searchTerm.toLowerCase()

      return (
        holder.includes(search) ||
        number.includes(search) ||
        type.includes(search)
      )
    })

  // ======================
  // Error
  // ======================

  if (error) {

    return (
      <div className="max-w-4xl mx-auto py-20 text-center">

        <div className="text-red-500 mb-4">

          <MagnifyingGlassIcon className="w-24 h-24 mx-auto opacity-50" />

        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">

          Unable to load policies

        </h1>

        <button
          onClick={refetch}
          className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-2xl font-semibold"
        >
          Retry
        </button>

      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-12 space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div className="flex items-center space-x-4">

          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
          >

            <ArrowLeftIcon className="w-5 h-5" />

            <span>
              Back to Dashboard
            </span>

          </Link>

          <div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">

              All Policies

            </h1>

            <p className="text-gray-600 dark:text-gray-400">

              Manage and view all your insurance policies

            </p>

          </div>

        </div>

        <div className="flex items-center space-x-4">

          <div className="glass px-4 py-2 rounded-2xl">

            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">

              Total: {policies.length} policies

            </span>

          </div>

        </div>

      </div>

      {/* Search */}
      <div className="glass p-4 rounded-3xl">

        <div className="max-w-md mx-auto">

          <div className="relative">

            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />

            <FunnelIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (

            <div className="mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden">

              {suggestions.map((policy) => (

                <button
                  key={policy.id}
                  type="button"
                  onClick={() => {

                    setSearchTerm(
                      policy.policyHolder
                    )

                    setSuggestions([])
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >

                  <p className="font-semibold text-gray-900 dark:text-white">

                    {policy.policyHolder}

                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">

                    {policy.type} • {policy.policyNumber}

                  </p>

                </button>

              ))}

            </div>

          )}

        </div>

      </div>

      {/* Loading */}
      {loading ? (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[...Array(6)].map((_, i) => (

            <div
              key={i}
              className="glass p-6 rounded-3xl h-64 animate-pulse"
            />

          ))}

        </div>

      ) : filteredPolicies.length === 0 ? (

        <div className="text-center py-20">

          <div className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-8">

            <span className="text-4xl opacity-50">
              📋
            </span>

          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">

            No policies found

          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-8">

            Try different keywords or add a new policy

          </p>

          <button
            onClick={() => {
              setSearchTerm('')
              setSuggestions([])
            }}
            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-2xl font-semibold"
          >

            Clear Search

          </button>

        </div>

      ) : viewMode === 'cards' ? (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredPolicies.map((policy) => (

            <PolicyCard
              key={policy.id}
              policy={policy}
            />

          ))}

        </div>

      ) : (

        <PolicyTable
          policies={filteredPolicies}
        />

      )}

    </div>
  )
}

export default ViewPolicies