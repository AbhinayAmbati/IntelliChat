import { MessageSquare, Plus, Settings, LogOut, Trash2, History, Menu } from 'lucide-react';
import { Link } from 'react-router-dom'
import { useState } from 'react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const chatHistory = [
    { id: 1, title: "Getting Started with React", timestamp: "2 hours ago" },
    { id: 2, title: "Debugging JavaScript", timestamp: "Yesterday" },
    { id: 3, title: "API Integration Help", timestamp: "2 days ago" },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (isCollapsed) {
    return (
      <div className="w-16 h-full bg-gray-900 text-white p-4 flex flex-col items-center">
        <button
          onClick={toggleSidebar}
          className="p-3 hover:bg-gray-800 rounded-lg transition-colors mb-6"
          aria-label="Expand Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-64 h-full bg-gray-900 text-white p-4 flex flex-col">
      
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={toggleSidebar}
          className="p-3 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Collapse Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button className="flex items-center gap-2 flex-1 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          New Chat
        </button>
        
      </div>

      <div className="flex items-center gap-2 mb-4 text-gray-400">
        <History className="w-5 h-5" />
        <span className="font-medium">Chat History</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer group"
          >
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <div className="flex-1 truncate">
              <p className="text-sm text-gray-200 truncate">{chat.title}</p>
              <p className="text-xs text-gray-400">{chat.timestamp}</p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
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
    </div>
  );
};

export default Sidebar; 