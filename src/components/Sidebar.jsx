import { MessageSquare, Plus, Settings, LogOut, Trash2, History, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ onChatSelect, activeChatId, chatHistory, onNewChat, onDeleteChat }) => {
  Sidebar.propTypes = {
    onChatSelect: PropTypes.func.isRequired,
    activeChatId: PropTypes.string,
    chatHistory: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        messages: PropTypes.array
      })
    ).isRequired,
    onNewChat: PropTypes.func.isRequired,
    onDeleteChat: PropTypes.func.isRequired,
  };
  
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Function to handle chat selection
  const handleChatSelect = (chat) => {
    if (onChatSelect) {
      onChatSelect(chat.id, chat.messages);
    }
  };

  return (
    <div className={`h-full bg-gray-900 text-white p-4 flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className={`flex items-center gap-2 mb-6 ${isCollapsed ? 'justify-center' : ''}`}>
        <button
          onClick={toggleSidebar}
          className="p-3 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <Menu className="w-5 h-5" />
        </button>
        {!isCollapsed ? (
          <button 
            onClick={onNewChat}
            className="flex items-center gap-2 flex-1 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        ) : (
          null
        )}
      </div>

      {!isCollapsed && (
        <>
          <div className="flex items-center gap-2 mb-4 text-gray-400">
            <History className="w-5 h-5" />
            <span className="font-medium">Chat History</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {chatHistory.length > 0 ? (
              chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleChatSelect(chat)}
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer group
                    ${activeChatId === chat.id ? 'bg-gray-800 border-l-2 border-blue-500' : ''}`}
                >
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <div className="flex-1 truncate">
                    <p className="text-sm text-gray-200 truncate">{chat.title}</p>
                    <p className="text-xs text-gray-400">{chat.timestamp}</p>
                  </div>
                  <button 
                    className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the chat selection
                      onDeleteChat(chat.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 text-sm py-4">
                No chat history yet
              </div>
            )}
          </div>

          <div className="border-t border-gray-800 pt-4 mt-4 space-y-2">
            <Link to="/settings">
              <button className="flex items-center gap-2 w-full p-3 hover:bg-gray-800 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </Link>
            <Link to="/signin">
              <button className="flex items-center gap-2 w-full p-3 hover:bg-gray-800 rounded-lg text-red-400 transition-colors">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;