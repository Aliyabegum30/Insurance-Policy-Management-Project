const Footer = () => {
  return (
    <footer className="glass mt-20 p-8 text-center">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold">🏦</span>
            </span>
            <span className="font-bold text-xl bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              InsurePro
            </span>
          </div>
          
          <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <a href="#privacy" className="hover:text-primary-600 transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-primary-600 transition-colors">Terms</a>
            <a href="#support" className="hover:text-primary-600 transition-colors">Support</a>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © 2024 InsurePro. All rights reserved. Built with ❤️ for learning OOP.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer