import { useState } from 'react';
import { 
  User, 
  Key, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  HelpCircle
} from 'lucide-react';
import NavbarIn from '../components/NavbarIn';
import Account from '../components/settings/Account';
import ApiKeys from '../components/settings/ApiKeys';
import Notifications from '../components/settings/Notifications';
import Security from '../components/settings/Security';
import Appearance from '../components/settings/Appearance';
import Language from '../components/settings/Language';
import Help from '../components/settings/Help';

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

  const toggleNotification = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <Account accountForm={accountForm} setAccountForm={setAccountForm} />;
      case 'api-keys':
        return <ApiKeys apiKeys={apiKeys} setApiKeys={setApiKeys} showApiKey={showApiKey} setShowApiKey={setShowApiKey} />;
      case 'notifications':
        return <Notifications notificationSettings={notificationSettings} toggleNotification={toggleNotification} />;
      case 'security':
        return <Security securitySettings={securitySettings} setSecuritySettings={setSecuritySettings} />;
      case 'appearance':
        return <Appearance appearanceSettings={appearanceSettings} setAppearanceSettings={setAppearanceSettings} />;
      case 'language':
        return <Language languageSettings={languageSettings} setLanguageSettings={setLanguageSettings} />;
      case 'help':
        return <Help />;
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
            <div className="w-64 flex-shrink-0 relative">
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