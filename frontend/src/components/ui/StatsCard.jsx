import { motion } from 'framer-motion'

const colorMap = {
  indigo: 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600',
  green: 'bg-green-100 dark:bg-green-900/20 text-green-600',
  purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600',
  blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
}

const StatsCard = ({
  title,
  value,
  change,
  icon: Icon,
  color,
  loading
}) => {

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass p-6 rounded-3xl shadow-xl border border-gray-200/30 dark:border-gray-700/30"
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {loading ? '...' : value}
          </h3>

          <p className="text-sm text-green-500 mt-2 font-medium">
            {change}
          </p>
        </div>

        <div className={`p-4 rounded-2xl ${colorMap[color]}`}>
          <Icon className="w-7 h-7" />
        </div>

      </div>
    </motion.div>
  )
}

export default StatsCard