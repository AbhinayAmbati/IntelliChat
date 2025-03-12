import { useState } from 'react';
import { 
  User, 
  Key, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  HelpCircle,
  Copy,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Camera,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  X,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import NavbarIn from '../components/NavbarIn';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Development Key', key: 'sk_test_51Nx...', created: '2024-01-15', lastUsed: '2024-01-20' },
    { id: 2, name: 'Production Key', key: 'sk_live_51Nx...', created: '2024-01-10', lastUsed: '2024-01-19' }
  ]);
  const [accountForm, setAccountForm] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    profilePicture: '/api/placeholder/150/150'
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newFeatures: true,
    securityAlerts: true,
    marketingEmails: false,
    usageReports: true
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '2 hours',
    lastPasswordChange: '2023-12-10'
  });
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'system',
    fontSize: 'medium',
    compactMode: false
  });
  const [languageSettings, setLanguageSettings] = useState({
    language: 'English',
    region: 'United States',
    dateFormat: 'MM/DD/YYYY'
  });

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  const generateNewApiKey = () => {
    const newKey = {
      id: apiKeys.length + 1,
      name: 'New API Key',
      key: 'sk_' + Math.random().toString(36).substr(2, 32),
      created: new Date().toISOString().split('T')[0],
      lastUsed: '-'
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const deleteApiKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };
  
  const toggleNotification = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
  };
  
  const handleThemeChange = (theme) => {
    setAppearanceSettings({
      ...appearanceSettings,
      theme
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
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
                      <span className="text-blue-600 dark:text-blue-300 font-bold">G</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Google</span>
                  </div>
                  <button className="text-blue-500 hover:underline text-sm">Connect</button>
                </div>
                <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-white font-bold">G</span>
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

      case 'api-keys':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">API Keys</h2>
              <button
                onClick={generateNewApiKey}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Generate New Key
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-400">
              Manage your API keys for external integrations. Keep these secure and never share them publicly.
            </p>

            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{apiKey.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <input
                            type={showApiKey ? "text" : "password"}
                            value={apiKey.key}
                            readOnly
                            className="bg-transparent border-none focus:ring-0 p-0"
                          />
                          <button
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => copyToClipboard(apiKey.key)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteApiKey(apiKey.id)}
                      className="text-red-500 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>Created: {apiKey.created}</span>
                    <span>Last used: {apiKey.lastUsed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'notifications':
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

      case 'security':
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

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Appearance</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Customize how the application looks and feels
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div 
                  className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    appearanceSettings.theme === 'light' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-500/50'
                  }`}
                  onClick={() => handleThemeChange('light')}
                >
                  <div className="w-16 h-16 bg-gray-100 border border-gray-300 rounded-lg mb-3 flex items-center justify-center">
                    <Sun className="w-8 h-8 text-yellow-500" />
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Light</span>
                </div>
                
                <div 
                  className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    appearanceSettings.theme === 'dark' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-500/50'
                  }`}
                  onClick={() => handleThemeChange('dark')}
                >
                  <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-lg mb-3 flex items-center justify-center">
                    <Moon className="w-8 h-8 text-gray-300" />
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Dark</span>
                </div>
                
                <div 
                  className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    appearanceSettings.theme === 'system' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-500/50'
                  }`}
                  onClick={() => handleThemeChange('system')}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-800 border border-gray-300 rounded-lg mb-3 flex items-center justify-center">
                    <Monitor className="w-8 h-8 text-blue-500" />
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">System</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Text Size</h3>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">A</span>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="1"
                  value={appearanceSettings.fontSize === 'small' ? 0 : appearanceSettings.fontSize === 'medium' ? 1 : 2}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    const size = value === 0 ? 'small' : value === 1 ? 'medium' : 'large';
                    setAppearanceSettings({...appearanceSettings, fontSize: size});
                  }}
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xl text-gray-500 dark:text-gray-400">A</span>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className={`text-gray-800 dark:text-gray-200 ${
                  appearanceSettings.fontSize === 'small' 
                    ? 'text-sm' 
                    : appearanceSettings.fontSize === 'medium' 
                      ? 'text-base' 
                      : 'text-lg'
                }`}>
                  This is a preview of how text will appear throughout the application.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Compact Mode</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Reduce spacing and show more content on screen
                  </p>
                </div>
                <button 
                  onClick={() => setAppearanceSettings({...appearanceSettings, compactMode: !appearanceSettings.compactMode})}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {appearanceSettings.compactMode ? 
                    <ToggleRight className="w-10 h-6 text-blue-500" /> : 
                    <ToggleLeft className="w-10 h-6" />
                  }
                </button>
              </div>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Language & Region</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Customize your language preferences and regional settings
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={languageSettings.language}
                  onChange={(e) => setLanguageSettings({...languageSettings, language: e.target.value})}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Region
                </label>
                <select
                  value={languageSettings.region}
                  onChange={(e) => setLanguageSettings({...languageSettings, region: e.target.value})}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date Format
                </label>
                <select
                  value={languageSettings.dateFormat}
                  onChange={(e) => setLanguageSettings({...languageSettings, dateFormat: e.target.value})}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
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

      case 'help':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Get help with your account and find answers to common questions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Documentation</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Explore our comprehensive documentation to learn more about features and usage.
                </p>
                <button className="text-blue-500 hover:text-blue-600 font-medium">
                  View Documentation &rarr;
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">FAQs</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Find answers to frequently asked questions about our platform.
                </p>
                <button className="text-blue-500 hover:text-blue-600 font-medium">
                  View FAQs &rarr;
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Contact Support</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Need help? Our support team is here to assist you.
                </p>
                <button className="text-blue-500 hover:text-blue-600 font-medium">
                  Contact Support &rarr;
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Community</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Join our community to connect with other users and share experiences.
                </p>
                <button className="text-blue-500 hover:text-blue-600 font-medium">
                  Join Community &rarr;
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <>
      <NavbarIn />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">

            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
                        activeTab === tab.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;