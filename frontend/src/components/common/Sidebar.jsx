import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊', roles: ['Admin', 'Base Commander', 'Logistics Officer'] },
    { key: 'purchases', label: 'Purchases', icon: '🛒', roles: ['Admin', 'Logistics Officer'] },
    { key: 'transfers', label: 'Transfers', icon: '🔄', roles: ['Admin', 'Logistics Officer'] },
    { key: 'assignments', label: 'Assignments & Expenditures', icon: '📋', roles: ['Admin', 'Base Commander'] },
  ];

  const visibleTabs = tabs.filter(tab => tab.roles.includes(user.role));

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-full fixed left-0 top-0 overflow-y-auto transition-all duration-300 ease-in-out">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">Military Asset Management</h2>
        <nav>
          <ul className="space-y-2">
            {visibleTabs.map(tab => (
              <li key={tab.key}>
                <button
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ease-in-out flex items-center space-x-3 ${
                    activeTab === tab.key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-700 p-3 rounded-lg mb-2">
          <p className="text-sm text-gray-300">Logged in as:</p>
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs text-gray-400">{user.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
