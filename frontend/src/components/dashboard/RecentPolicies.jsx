import { motion } from 'framer-motion'

const RecentPolicies = ({ policy }) => {

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30"
    >
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {policy.policyHolder}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {policy.type} Insurance
        </p>
      </div>

      <div className="text-right">
        <p className="font-bold text-indigo-600">
          ₹{policy.coverageAmount}
        </p>

        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900/20">
          Active
        </span>
      </div>
    </motion.div>
  )
}

export default RecentPolicies