import PropTypes from 'prop-types';
import { Sun, Moon, Monitor, ToggleLeft, ToggleRight } from 'lucide-react';
import { appearanceSettingsPropTypes } from './propTypes';

const Appearance = ({ appearanceSettings, setAppearanceSettings }) => {
  const handleThemeChange = (theme) => {
    setAppearanceSettings({
      ...appearanceSettings,
      theme
    });
  };

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
};

Appearance.propTypes = {
  appearanceSettings: appearanceSettingsPropTypes.isRequired,
  setAppearanceSettings: PropTypes.func.isRequired
};

export default Appearance; 