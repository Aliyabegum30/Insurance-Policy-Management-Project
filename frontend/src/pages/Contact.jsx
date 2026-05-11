const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 space-y-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
          Get In Touch
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have questions about our Insurance Policy Management System? 
          We'd love to hear from you!
        </p>
      </div>

      <div className="glass p-8 rounded-3xl grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Contact Information</h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-black/30 rounded-2xl">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">📧</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                <p className="text-gray-600 dark:text-gray-400">support@insurepro.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-black/30 rounded-2xl">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">📱</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Phone</h4>
                <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-black/30 rounded-2xl">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">🌐</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Website</h4>
                <p className="text-gray-600 dark:text-gray-400">www.insurepro.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h3>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/30 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/30 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
            <div>
              <textarea
                rows="4"
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/30 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-vertical"
              ></textarea>
            </div>
            <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact