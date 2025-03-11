import { FaRobot } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { User, Settings, LogOut} from 'lucide-react';
import { Link } from 'react-router-dom';

const NavbarIn = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full top-0 left-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/"><div className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 cursor-pointer">
            <FaRobot className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              IntelliChat
            </span>
          </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 p-1.5 rounded-full hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 border dark:border-gray-700 transform transition-all duration-200 ease-out scale-100 opacity-100">
                  <div className="px-4 py-3 border-b dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">john@example.com</p>
                  </div>
                  
                  <div className="py-1">
                    <Link to="/settings">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    </Link>
                  </div>

                  <div className="border-t dark:border-gray-700 mt-1">
                    <Link to="/signin">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-150">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarIn;