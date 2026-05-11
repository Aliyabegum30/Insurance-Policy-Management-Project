import { motion } from 'framer-motion'

import {
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  Plus,
  FileCheck,
  ChevronRight
} from 'lucide-react'

import { Link } from 'react-router-dom'

import StatsCard from '../components/ui/StatsCard'
import RecentPolicies from '../components/dashboard/RecentPolicies'
import useApi from '../hooks/useApi'

const Dashboard = () => {

  // Fetch Stats
  const {
    data: statsDataResponse = {},
    loading: statsLoading
  } = useApi('/policies/stats')

  // Fetch Policies
  const {
    data: policiesResponse = [],
    loading: policiesLoading
  } = useApi('/policies')

  // ======================
  // Fix API Response Structure
  // ======================

  const stats =
    statsDataResponse?.data ||
    statsDataResponse ||
    {}

  const policies = Array.isArray(policiesResponse)
    ? policiesResponse
    : policiesResponse?.data || []

  // ======================
  // Recent Policies
  // ======================

  const recentPolicies = [...policies]
    .reverse()
    .slice(0, 5)

  // ======================
  // Dashboard Stats
  // ======================

  const statsCards = [
    {
      title: 'Total Policies',
      value: stats?.totalPolicies || policies.length || 0,
      change: '+12%',
      icon: FileText,
      color: 'indigo'
    },

    {
      title: 'Active Policies',
      value:
        (stats?.byType?.LIFE || 0) +
        (stats?.byType?.HEALTH || 0) +
        (stats?.byType?.VEHICLE || 0),

      change: '+8%',
      icon: Users,
      color: 'green'
    },

    {
      title: 'Total Premium',
      value: `₹${(
        stats?.totalPremium || 0
      ).toLocaleString()}`,

      change: '+25%',
      icon: DollarSign,
      color: 'purple'
    },

    {
      title: 'Avg Policy Value',
      value:
        policies.length > 0
          ? `₹${Math.round(
              (stats?.totalPremium || 0) /
              policies.length
            ).toLocaleString()}`
          : '₹0',

      change: '+15%',
      icon: TrendingUp,
      color: 'blue'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 p-6"
    >

      {/* Hero Section */}
      <div className="glass p-8 rounded-3xl">

        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 dark:from-white dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent mb-4">
          Welcome back 👋
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300">
          Manage your insurance policies efficiently.
        </p>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {statsCards.map((stat, index) => (

          <StatsCard
            key={index}
            {...stat}
            loading={statsLoading}
          />

        ))}

      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Recent Policies */}
        <div className="lg:col-span-2 glass p-6 rounded-3xl">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent Policies
            </h2>

            <Link
              to="/policies"
              className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>

          </div>

          <div className="space-y-4">

            {policiesLoading ? (

              [...Array(3)].map((_, index) => (

                <div
                  key={index}
                  className="h-24 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse"
                />

              ))

            ) : recentPolicies.length > 0 ? (

              recentPolicies.map((policy) => (

                <RecentPolicies
                  key={policy._id || policy.id}
                  policy={policy}
                />

              ))

            ) : (

              <div className="text-center py-10">

                <FileText className="w-14 h-14 mx-auto text-gray-400 mb-4" />

                <p className="text-gray-500 dark:text-gray-400">
                  No policies found
                </p>

              </div>

            )}

          </div>

        </div>

        {/* Quick Actions */}
        <div className="glass p-6 rounded-3xl">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">

            <Link
              to="/add-policy"
              className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-[1.02] transition-all duration-300"
            >
              <Plus />
              Add New Policy
            </Link>

            <Link
              to="/about"
              className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-[1.02] transition-all duration-300"
            >
              <FileCheck />
              About Section
            </Link>

          </div>

        </div>

      </div>

    </motion.div>
  )
}

export default Dashboard