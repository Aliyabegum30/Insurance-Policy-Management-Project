import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const PolicyCard = ({ policy }) => {
  const getTypeColor = (type) => {
    const colors = {
      LIFE: 'from-blue-500 to-blue-600',
      HEALTH: 'from-green-500 to-green-600',
      VEHICLE: 'from-orange-500 to-orange-600'
    }
    return colors[type] || 'from-gray-500 to-gray-600'
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="glass p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${getTypeColor(policy.type)}`}>
            <span className="text-white font-bold text-lg">
              {policy.type === 'LIFE' ? '👤' : 
               policy.type === 'HEALTH' ? '🏥' : 
               '🚗'}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
              {policy.policyHolder}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              {policy.policyNumber}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">
            {formatCurrency(policy.premium)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Premium</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div>
          <span className="text-gray-500 dark:text-gray-400">Coverage:</span>
          <p className="font-semibold text-gray-900 dark:text-white">
            {new Intl.NumberFormat().format(policy.coverageAmount)}
          </p>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400">Status:</span>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            policy.status === 'ACTIVE' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
          }`}>
            {policy.status}
          </span>
        </div>
        {policy.age && (
          <div>
            <span className="text-gray-500 dark:text-gray-400">Age:</span>
            <p className="font-semibold">{policy.age} years</p>
          </div>
        )}
        {policy.vehicleType && (
          <div>
            <span className="text-gray-500 dark:text-gray-400">Vehicle:</span>
            <p className="font-semibold capitalize">{policy.vehicleType}</p>
          </div>
        )}
      </div>

      <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          to={`/policies/${policy.id}`}
          className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-xl text-sm font-medium flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-lg"
        >
          <EyeIcon className="w-4 h-4" />
          <span>View</span>
        </Link>
        <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-300">
          <PencilIcon className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300">
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default PolicyCard