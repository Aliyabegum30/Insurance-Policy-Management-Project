import React from 'react'

const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 space-y-12">
      <div className="text-center">
        <div className="w-32 h-32 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl">🏦</span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
          About InsurePro
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          A complete Insurance Policy Management System built with modern web technologies 
          demonstrating OOP principles including Inheritance, Polymorphism, Encapsulation, 
          and Exception Handling.
        </p>
      </div>

      <div className="glass p-8 rounded-3xl grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">✨ Features</h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start space-x-3">
              <span className="text-green-500 font-semibold mt-0.5">✓</span>
              <span>Full CRUD operations for policies</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-green-500 font-semibold mt-0.5">✓</span>
              <span>Real-time premium calculation</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-green-500 font-semibold mt-0.5">✓</span>
              <span>Search & Filter functionality</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-green-500 font-semibold mt-0.5">✓</span>
              <span>Dark/Light mode support</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-green-500 font-semibold mt-0.5">✓</span>
              <span>Responsive design</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🛠️ Tech Stack</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-4 rounded-2xl text-center hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">⚛️</div>
              <span className="font-semibold text-gray-900 dark:text-white block">React + Vite</span>
            </div>
            <div className="glass p-4 rounded-2xl text-center hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">🎨</div>
              <span className="font-semibold text-gray-900 dark:text-white block">Tailwind CSS</span>
            </div>
            <div className="glass p-4 rounded-2xl text-center hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">⚡</div>
              <span className="font-semibold text-gray-900 dark:text-white block">Node.js + Express</span>
            </div>
            <div className="glass p-4 rounded-2xl text-center hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">📚</div>
              <span className="font-semibold text-gray-900 dark:text-white block">OOP Design</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-3xl text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎓 OOP Concepts Demonstrated</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '👤', title: 'Inheritance', desc: 'Policy → LifePolicy, HealthPolicy, VehiclePolicy' },
            { icon: '🔄', title: 'Polymorphism', desc: 'calculatePremium() & displayPolicyDetails()' },
            { icon: '🔒', title: 'Encapsulation', desc: 'Private fields with getters/setters' },
            { icon: '⚠️', title: 'Exception Handling', desc: 'InvalidPolicyException' },
            { icon: '🏭', title: 'Factory Pattern', desc: 'PolicyFactory.createPolicy()' },
            { icon: '🎛️', title: 'Interface', desc: 'Insurable interface implementation' }
          ].map((concept, index) => (
            <div 
              key={index} 
              className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {concept.icon}
              </div>
              <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                {concept.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {concept.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Demo Links */}
      <div className="glass p-8 rounded-3xl text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">🚀 Quick Demo</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/add-policy" className="group">
            <div className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
                <span className="text-2xl text-white">➕</span>
              </div>
              <h4 className="font-bold text-lg mb-2">Add Policy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Test form validation & premium calculation</p>
            </div>
          </a>
          <a href="/policies" className="group">
            <div className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
                <span className="text-2xl text-white">📋</span>
              </div>
              <h4 className="font-bold text-lg mb-2">View Policies</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Card/Table views with search</p>
            </div>
          </a>
          <div className="group">
            <div className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer" onClick={() => window.location.reload()}>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
                <span className="text-2xl text-white">🔄</span>
              </div>
              <h4 className="font-bold text-lg mb-2">Refresh Data</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Reload policies from backend</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About