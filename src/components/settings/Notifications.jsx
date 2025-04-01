import PropTypes from 'prop-types';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import { notificationSettingsPropTypes } from './propTypes';

const Notifications = ({ notificationSettings, toggleNotification }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notification Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage how and when you receive notifications from our platform
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Email Notifications</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-gray-800 dark:text-gray-200 font-medium">Email Notifications</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Receive notifications via email</p>
              </div>
              <button 
                onClick={() => toggleNotification('emailNotifications')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {notificationSettings.emailNotifications ? 
                  <ToggleRight className="w-10 h-6 text-blue-500" /> : 
                  <ToggleLeft className="w-10 h-6" />
                }
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-gray-800 dark:text-gray-200 font-medium">New Features</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Get notified about new features and updates</p>
              </div>
              <button 
                onClick={() => toggleNotification('newFeatures')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {notificationSettings.newFeatures ? 
                  <ToggleRight className="w-10 h-6 text-blue-500" /> : 
                  <ToggleLeft className="w-10 h-6" />
                }
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-gray-800 dark:text-gray-200 font-medium">Security Alerts</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Receive important security notifications</p>
              </div>
              <button 
                onClick={() => toggleNotification('securityAlerts')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {notificationSettings.securityAlerts ? 
                  <ToggleRight className="w-10 h-6 text-blue-500" /> : 
                  <ToggleLeft className="w-10 h-6" />
                }
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-gray-800 dark:text-gray-200 font-medium">Marketing Emails</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Receive promotional content and offers</p>
              </div>
              <button 
                onClick={() => toggleNotification('marketingEmails')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {notificationSettings.marketingEmails ? 
                  <ToggleRight className="w-10 h-6 text-blue-500" /> : 
                  <ToggleLeft className="w-10 h-6" />
                }
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-gray-800 dark:text-gray-200 font-medium">Usage Reports</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Receive weekly usage statistics</p>
              </div>
              <button 
                onClick={() => toggleNotification('usageReports')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {notificationSettings.usageReports ? 
                  <ToggleRight className="w-10 h-6 text-blue-500" /> : 
                  <ToggleLeft className="w-10 h-6" />
                }
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
          Reset to Default
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
          Save Changes
        </button>
      </div>
    </div>
  );
};

Notifications.propTypes = {
  notificationSettings: notificationSettingsPropTypes.isRequired,
  toggleNotification: PropTypes.func.isRequired
};

export default Notifications; 