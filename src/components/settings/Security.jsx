import PropTypes from 'prop-types';
import { Monitor, X } from 'lucide-react';
import { securitySettingsPropTypes } from './propTypes';

const Security = ({ securitySettings, setSecuritySettings }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage security settings and authentication methods for your account
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700 space-y-6">
        <div className="pb-4 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Password</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Last changed: {securitySettings.lastPasswordChange}
              </p>
            </div>
            <button className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700">
              Change Password
            </button>
          </div>
        </div>
        
        <div className="pb-4 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
            <button 
              className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700"
            >
              {securitySettings.twoFactorAuth ? 'Manage' : 'Enable'}
            </button>
          </div>
        </div>
        
        <div className="pb-4 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Session Timeout</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Automatically log out after period of inactivity
              </p>
            </div>
            <select 
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={securitySettings.sessionTimeout}
              onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
            >
              <option value="30 minutes">30 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="2 hours">2 hours</option>
              <option value="4 hours">4 hours</option>
              <option value="8 hours">8 hours</option>
            </select>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Active Sessions</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Manage devices where you&apos;re currently logged in
              </p>
            </div>
            <button className="px-3 py-1 text-sm text-red-600 dark:text-red-400 border border-red-600 dark:border-red-400 rounded-md hover:bg-red-50 dark:hover:bg-gray-700">
              Log Out All Devices
            </button>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">MacBook Pro - Chrome</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">New York, USA • Current Session</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs">
                <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></span>
                Active now
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">iPhone 13 - Safari</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">San Francisco, USA • 2 days ago</p>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-600 dark:hover:text-red-400">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Security.propTypes = {
  securitySettings: securitySettingsPropTypes.isRequired,
  setSecuritySettings: PropTypes.func.isRequired
};

export default Security; 