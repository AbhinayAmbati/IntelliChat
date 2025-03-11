import { MessageSquare, Zap, Shield, Sparkles } from 'lucide-react';
import { FaRobot, FaBrain } from 'react-icons/fa';
import { MdSpeed, MdSecurity } from 'react-icons/md';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 h-[100vh] flex items-center bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <FaRobot className="h-16 w-16 text-blue-500 animate-bounce" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to <span className="text-blue-500">IntelliChat</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the future of conversation with our AI-powered chatbot. Smart, fast, and always ready to help.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Try Now
              </button>
              <button className="px-8 py-3 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose IntelliChat?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                <FaBrain className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Smart AI
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Powered by advanced AI to understand and respond naturally.
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                <MdSpeed className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get instant responses with minimal latency.
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                <MdSecurity className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your conversations are private and protected.
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                24/7 Available
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Always ready to help, any time of day.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to experience the future of chat?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who are already enjoying smarter conversations.
          </p>
          <button className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center mx-auto">
            <Shield className="w-5 h-5 mr-2" />
            Get Started Free
          </button>
        </div>
      </div>
    </div></>
  );
};

export default LandingPage;