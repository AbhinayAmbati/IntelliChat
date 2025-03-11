import { FaRobot } from 'react-icons/fa';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = () => {


  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <FaRobot className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-white">
              IntelliChat
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/signin"><button className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 flex items-center">
              <FiLogIn className="w-5 h-5 mr-2" />
              Sign In
            </button>
            </Link>
            <Link to="/signup"><button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center">
              <FiUserPlus className="w-5 h-5 mr-2" />
              Sign Up
            </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;