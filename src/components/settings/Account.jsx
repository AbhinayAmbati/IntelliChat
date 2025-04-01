import PropTypes from 'prop-types';
import { Camera, CheckCircle, Github } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { accountFormPropTypes } from './propTypes';

const Account = ({ accountForm, setAccountForm }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your personal information and account preferences
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
        <div className="flex items-start gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
              {'J'}
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={accountForm.name}
                onChange={(e) => setAccountForm({...accountForm, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={accountForm.email}
                  onChange={(e) => setAccountForm({...accountForm, email: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Linked Accounts</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-bold"><FcGoogle/></span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">Google</span>
            </div>
            <button className="text-blue-500 hover:underline text-sm">Connect</button>
          </div>
          <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-white font-bold"><Github/></span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">GitHub</span>
            </div>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" /> Connected
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
          Save Changes
        </button>
      </div>
    </div>
  );
};

Account.propTypes = {
  accountForm: accountFormPropTypes.isRequired,
  setAccountForm: PropTypes.func.isRequired
};

export default Account; 