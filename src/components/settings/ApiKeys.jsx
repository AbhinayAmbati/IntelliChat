import PropTypes from 'prop-types';
import { Plus, Eye, EyeOff, Copy, Trash2 } from 'lucide-react';
import { apiKeyPropTypes } from './propTypes';

const ApiKeys = ({ apiKeys, setApiKeys, showApiKey, setShowApiKey }) => {
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
            <div className="flex gap-4 text-sm text-gray-500  dark:text-gray-400">
              <span>Created: {apiKey.created}</span>
              <span>Last used: {apiKey.lastUsed}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ApiKeys.propTypes = {
  apiKeys: PropTypes.arrayOf(apiKeyPropTypes).isRequired,
  setApiKeys: PropTypes.func.isRequired,
  showApiKey: PropTypes.number,
  setShowApiKey: PropTypes.func.isRequired
};

export default ApiKeys; 