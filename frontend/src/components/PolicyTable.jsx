const PolicyTable = ({ policies }) => {
  return (
    <div className="glass rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-primary-500 to-primary-600">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Policy #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Holder
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
                Coverage
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
                Premium
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {policies.map((policy) => (
              <tr key={policy.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                  {policy.policyNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {policy.policyHolder}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    policy.type === 'LIFE' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' :
                    policy.type === 'HEALTH' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                    'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200'
                  }`}>
                    {policy.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white font-semibold">
                  ₹{new Intl.NumberFormat().format(policy.coverageAmount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-primary-600">
                  ₹{new Intl.NumberFormat().format(policy.premium)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    policy.status === 'ACTIVE' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  }`}>
                    {policy.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button className="text-primary-600 hover:text-primary-900 p-1 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/20 transition-colors">
                    View
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/20 transition-colors">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PolicyTable